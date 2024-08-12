# Toasts-and-Modals
Toasts and Modals created with native JS

## How to use?
To create a new instance of the toasts class, we can execute the following code:

#### JS

`const message = new MessageSV();`

Create a new instance with predefined options:

      marginX: 20, // 20px

      marginY: 20, // 20px

      gap: 20, // The gap size in pixels between toasts

      width: 300, // 300px

      effect: 'ease', // CSS transition timings

      duration: '.5s', // Transition duration

      blur: true, // Dim old notifications while the newest notification stays highlighted

      position: 'top-right' // top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
    
### The toast object accepts the following options:

**title** => `[string]`

**content**	 => `[string]`

**style** => `success, error, verified, dark`

**link**	=> `[href]`

**linkTarget**	 => `_blank, _self, _parent, _top, framename`

**delMsg**	=> `[transition-duration]`

**closeButton**	 => `[boolean]`

**icon** => `[boolean]`

**onOpen**	=> `[function]`

**onClose**	 => `[function]`

**width**	=> `[integer]`