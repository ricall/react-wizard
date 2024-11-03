import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';

function App() {
  return (
    <Dialog open modal>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Dialog Lesson</DialogTitle>
          <DialogDescription>This is to illustrate this dialog.</DialogDescription>
        </DialogHeader>
        <hr />
        <div className="flex items-center space-x-2">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default App;
