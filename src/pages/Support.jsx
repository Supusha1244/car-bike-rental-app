export default function Support() {
  return (
    <div className="bg-white text-gray-800">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Center</h1>
          <p className="text-lg">We're here to help! Find answers to your questions or contact our support team.</p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg shadow p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">1. How do I book a car?</h3>
              <p className="text-gray-700">You can book a car through our website or mobile app. Simply select your desired vehicle, pick-up location, and rental dates to complete your reservation.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">2. What is the cancellation policy?</h3>
              <p className="text-gray-700">You can cancel your reservation up to 24 hours before your pick-up time without any fees. Cancellations made within 24 hours may incur a fee.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">3. What documents do I need to rent a car?</h3>
              <p className="text-gray-700">You will need a valid driver's license, a credit card in your name, and proof of insurance if you are not purchasing our coverage.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">4. Can I extend my rental period?</h3>
              <p className="text-gray-700">Yes, you can extend your rental period by contacting our support team or through the app, subject to vehicle availability.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">5. What should I do if I have an issue with my rental?</h3>
              <p className="text-gray-700">If you encounter any issues, please contact our 24/7 support team for assistance. We are here to help!</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">6. Is there a mileage limit?</h3>
              <p className="text-gray-700">Most of our rentals come with unlimited mileage, but please check the specific terms for your vehicle during booking.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 px-6">
        <div className="max-w-4xl mx-auto text-center bg-white border border-gray-200 rounded-lg shadow p-8">
          <h2 className="text-3xl font-bold mb-6">Contact Our Support Team</h2>
          <p className="mb-6 text-gray-700">If you have any questions or need further assistance, please reach out to us.</p>
          <ul className="space-y-2 text-lg text-gray-800">
            <li>📞 <strong>Phone:</strong> +1 (234) 567-890</li>
            <li>📧 <strong>Email:</strong> support@rideeasy.com</li>
            <li>💬 <strong>Live Chat:</strong> Chat with us online for immediate assistance during business hours.</li>
          </ul>
        </div>
      </section>

      <footer className="bg-blue-600 text-white text-center py-6 text-sm">
        © 2023 RideEasy Car Rentals. All rights reserved.
      </footer>
    </div>
  );
}
