export const MovieInput = `
  input MovieInput {
    title: String!
    description: String!
    duration: Int!
    genre: String!
    director: String!
    cast: [String!]
  }
`;

export const ScreeningInput = `
  input ScreeningInput {
    startTime: DateTime!
    endTime: DateTime!
    price: Float!
    availableSeats: Int!
  }
`;

export const ReservationInput = `
  input ReservationInput {
    screeningId: ID!
    movieId: ID!
    seats: [SeatInput!]!
    paymentMethod: PaymentMethod!
  }
  
  input SeatInput {
    seatNumber: String!
  }
`;