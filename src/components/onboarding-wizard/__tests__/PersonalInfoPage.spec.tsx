import { render } from '@testing-library/react';
import { PersonalInfoPage, schema } from '@/components/onboarding-wizard/PersonalInfoPage.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { Model } from '@/components/onboarding-wizard';
import { PropsWithChildren } from 'react';
import { safeExecute } from '@/components/onboarding-wizard/__tests__/utilities.ts';
import { ValidationError } from 'yup';

const UseFormWrapper = ({ children }: PropsWithChildren) => {
  const methods = useForm<Model>();

  return <FormProvider {...methods}>{children}</FormProvider>;
};

const isValidationError = (error: unknown): error is ValidationError => error instanceof ValidationError;

const VALID_NAME = 'test user';
const VALID_EMAIL = 'test@test.com';
const VALID_PHONE_NUMBER = '+1 1 718 222 2222';

describe('PersonalInfoPage', () => {
  const wrapper = () =>
    render(
      <UseFormWrapper>
        <PersonalInfoPage />
      </UseFormWrapper>,
    );

  it('should render as expected', () => {
    const { asFragment, queryByText, queryByPlaceholderText } = wrapper();

    expect(queryByText('Name')).not.toBeNull();
    expect(queryByPlaceholderText('e.g. Stephen King')).not.toBeNull();
    expect(queryByText('Email Address')).not.toBeNull();
    expect(queryByPlaceholderText('e.g. stephenking@lorem.com')).not.toBeNull();
    expect(queryByText('Phone Number')).not.toBeNull();
    expect(queryByPlaceholderText('e.g. +1 1 718 222 2222')).not.toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });

  describe('schema', () => {
    it('should error when no data is provided', async () => {
      const [error, value] = await safeExecute(
        schema.validate(
          {
            name: '',
            emailAddress: '',
            phoneNumber: '',
          },
          { abortEarly: false },
        ),
      );

      expect(value).toBeUndefined();
      if (!isValidationError(error)) throw new Error('unknown error');

      expect(error.errors).toHaveLength(3);
      expect(error.inner[0]).toMatchObject({ path: 'name', errors: ['This field is required'] });
      expect(error.inner[1]).toMatchObject({ path: 'emailAddress', errors: ['This field is required'] });
      expect(error.inner[2]).toMatchObject({ path: 'phoneNumber', errors: ['This field is required'] });
    });

    it('should validate when valid values are provided', async () => {
      const object = {
        name: VALID_NAME,
        emailAddress: VALID_EMAIL,
        phoneNumber: VALID_PHONE_NUMBER,
      };
      const [error, value] = await safeExecute(schema.validate(object, { abortEarly: false }));

      expect(value).toStrictEqual(object);
      expect(error).toBeUndefined();
    });

    it('should error when user name is not provided', async () => {
      const [error, value] = await safeExecute(
        schema.validate(
          {
            name: '',
            emailAddress: VALID_EMAIL,
            phoneNumber: VALID_PHONE_NUMBER,
          },
          { abortEarly: false },
        ),
      );

      expect(value).toBeUndefined();
      if (!isValidationError(error)) throw new Error('unknown error');

      expect(error.errors).toHaveLength(1);
      expect(error.inner[0]).toMatchObject({ path: 'name', errors: ['This field is required'] });
    });

    it('should error when an invalid email is entered', async () => {
      const [error, value] = await safeExecute(
        schema.validate(
          {
            name: VALID_NAME,
            emailAddress: 'test',
            phoneNumber: VALID_PHONE_NUMBER,
          },
          { abortEarly: false },
        ),
      );

      expect(value).toBeUndefined();
      if (!isValidationError(error)) throw new Error('unknown error');

      expect(error.errors).toHaveLength(1);
      expect(error.inner[0]).toMatchObject({ path: 'emailAddress', errors: ['This field is not a valid email'] });
    });

    it('should error when an invalid phone number is entered', async () => {
      const [error, value] = await safeExecute(
        schema.validate(
          {
            name: VALID_NAME,
            emailAddress: VALID_EMAIL,
            phoneNumber: '+61 123 456',
          },
          { abortEarly: false },
        ),
      );

      expect(value).toBeUndefined();
      if (!isValidationError(error)) throw new Error('unknown error');

      expect(error.errors).toHaveLength(1);
      expect(error.inner[0]).toMatchObject({ path: 'phoneNumber', errors: ['This field is not a valid phone number'] });
    });
  });
});
