import { TBooking } from "@/db/models/bookings-model";

export type DummyBookingType = typeof dummyBooking

export const dummyBooking = {
    name: 'Jessica',
    phoneNumber: '099202',
    email: 'owoo@gmail.com',
    postcode: '2222',
    prefferedDate: '10-10',
    prefferedTime: 'PM',
    selectedService: 'EndOfTenancyCleaning',
    bookingInfo: [
      {
        question: 'Most of our clients who book end of tenancy cleaning also add',
        answers: ["Window cleaning"],
        _id: "660f9585c14750a250f86525"
      },
      {
        question: 'Are there any blinds, which would require dusting?',
        answers: ["Yes"],
        _id: '660f9585c14750a250f86526'
      },
      {
        question: 'Would you like any uphostery to be cleaned?',
        answers: ["Hoovered Only"],
        _id: '660f9585c14750a250f86527'
      },
      {
        question: 'How would you like your carpets/rugs to be cleaned?',
        answers: ["Vacumed Only"],
        _id: '660f9585c14750a250f86528'
      },
      {
        question: 'Which of the following applies to your property',
        answers: ["Single"],
        _id: '660f9585c14750a250f86529'
      },
      {
        question: 'Please tell us about your place',
        answers: ["Flat"],
        _id: '660f9585c14750a250f8652a'
      }
    ],
    additionalNotes: 'Here are some additional notes',
    isRead: false,
    status: 'pending',
    _id: '660f9585c14750a250f86524'
  }

