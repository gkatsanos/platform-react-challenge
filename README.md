![Workflow Status](https://github.com/gkatsanos/platform-react-challenge/actions/workflows/cypress.yml/badge.svg)

### Technical Implementation details

- I decided to use NextJS as it provides file-based routing out of the box as well as server-side rendering capabilities.
- I also used TailwindCSS for styling.
- Cypress for E2E testing.

For each view (except the breed list) I created one standalone page (NextJS route): Home, Favorites, and Cat Detail.

- Home:
  - Displays two random images of cats.
  - The load more button fetches a new page of images.
- Cat detail page
  - Clicking an any image in Home shows the cat's breed details (if available).
  - There's an add/remove to favorites button
- Favorites:
  - Displays a list of favorited cats (for the defined user - I hardcoded user-123 to keep some state API-side)
  - We can remove a cat from the list by clicking the remove button.

### Things left out due to time constraints & general limitations

It was a small challenge to derive the UX by reading the technical challenge Readme (without some rough sketches). I took some liberties in the design and UX, but I hope it's still in line with the expectations. I did not use Modal dialogs for example. I also did not implement the breed list view as I thought it would be more interesting to focus on the cat detail view and the favorites functionality.

I would have also liked to implement a better error handling mechanism (like a toast message) for the API calls.

## To use, you need to create a .env file with the following content:

```bash
NEXT_PUBLIC_CAT_API_KEY=your_api_key
```
