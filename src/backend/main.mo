import List "mo:core/List";



actor {
  type Booking = {
    name : Text;
    phone : Text;
    service : Text;
    preferredDate : Text;
    preferredTime : Text;
    timestamp : Int;
  };

  let bookings = List.empty<Booking>();

  public shared ({ caller }) func submitBooking(name : Text, phone : Text, service : Text, preferredDate : Text, preferredTime : Text, timestamp : Int) : async () {
    let booking : Booking = {
      name;
      phone;
      service;
      preferredDate;
      preferredTime;
      timestamp;
    };
    bookings.add(booking);
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.reverse().toArray();
  };
};
