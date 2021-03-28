# Ticket Manager

[heroku link](https://yourticketmanager.herokuapp.com/)

## Additional functionality:
- on server error shows a server-error page.
- labels has persistent different colors.
- add labels persistently.
- search both by labels and input.
- delete label from specific ticket.
- delete label globally.
- expand ticket.
- mark as done/undone.



### On server error shows a server-error page:
   when error occurs a page for server error displayed.
   can be viewed by loading the heroku page, turn off the internet and try to search something in the search input.

### Labels has different persistent colors:
   label colors are kept as generated.
   can be seen by loading the heroku page, see the colors and on refresh see the same colors.

### Add labels persistently:
   can be viewed by the following steps:

   1. clicking the plus button positioned in the ticket: ![plus-button-preview](./readme-files/plus-button-preview.jpg)

   2. inserting new label name in the input appeared and press the 'Enter' button.
      now should find the new label in the tickets labels(next to the plus button).

   3. refresh the page and see the new label you added where you put it.

   the new label will get new random color.
   and it is persistent.

### search both by labels and input.
   search filters both input value and selected labels.
   to see try and choose a label from the main labels placed under the input, if more then 1 ticket appear you may filter them by typing in the text input.

   you can unchoose a label by clicking it again.

### delete label from specific ticket.
   clicking the 'x' placed at the right side of the ticket labels allows you to remove that label from the ticket labels. that action is persistent.

### delete label globally.
   clicking the 'x' placed at the right side of the main labels removes that label from the main label view and also from all tickets possess this label. that action is also persistent, and cannot be undone.
   
### expand ticket.
   by clicking on the "show more" button or by double clicking the ticket, it will resize itselves for the user convinience.
   going back to main view can be achieved by clicking the 'x' at the top right of the container, or by clicking the chosen ticket's background.

### mark as done/undone.
   each ticket can be marked as done or undone. done tickets will be marked clearly as 'done' with a solid black 'v' sign on the ticket's top-left corner. if the sign doesn't appear in its place it is simply marked as 'undone' ticket, on hover a faded 'v' will appear to sign an 'undone' ticket.
   to change the ticket done/undone mark just click the 'v' and it will toggle the mark to the different one.