# Auction
## An Auction Simulation using WebSockets  

This is an auction simulation where users can place bids and compete for an item in real-time. The auction process is powered by WebSockets, which allow bid updates to be transmitted in real-time to all users connected to the server.

#### Here's how the auction works:

<p align="center">
  <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDJkcXMydmtvdzUwdnZubHI2MXUyM3JybmV1MzB2Mjhwb2R1aHNmNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UIOb23rqha0BtjysTY/giphy.gif" alt="First-Gif" />
</p>

1. **User Registration**: When a user joins the auction, they are prompted to enter their name.
2. **Place a Bid**: Once registered, the user can place a bid on the auction item. Bids must be multiples of 500.
3. **Auction Updates**: As users place bids, the highest bidder is updated in real-time, and all users are notified of the new bid.
4. **Bid Validation**: The system ensures that each new bid is higher than the current highest bid. If the bid does not meet this requirement, the user is notified.



### Technologies Used:
- **Node.js**: For server-side logic and real-time communication.
- **WebSockets (Socket.io)**: To enable real-time communication between the server and clients.
- **Angular**: For building the frontend of the application.
- **CSS**: To style the user interface.
