export default function About() {
  return (
    <div className="bg-white text-gray-800">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story & Vision</h1>
          <p className="text-lg mb-8 leading-relaxed">
            At RideEasy, we're revolutionizing car rentals with cutting-edge technology and uncompromising customer service. Founded in 2024, our mission is to make car rentals seamless, affordable, and enjoyable.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">RideEasy in Numbers</h2>
            <p className="text-lg text-gray-600">Our commitment to excellence has helped us grow exponentially while maintaining industry-leading customer satisfaction.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <h3 className="font-semibold mb-1">Happy Customers</h3>
              <p className="text-gray-600 text-sm">Served with our premium rental experience</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">120+</div>
              <h3 className="font-semibold mb-1">Vehicle Models</h3>
              <p className="text-gray-600 text-sm">From economy to luxury classes</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <h3 className="font-semibold mb-1">Support</h3>
              <p className="text-gray-600 text-sm">Always here when you need us</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
              <h3 className="font-semibold mb-1">Pickup Locations</h3>
              <p className="text-gray-600 text-sm">Across major cities and airports</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6fde2549-a769-4167-a972-d17539c9720b.png"
              alt="DriveEasy founder handing keys to customer"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Our Humble Beginnings</h2>
            <p className="mb-4 text-gray-700">
              RideEasy was founded in 2024 by supusha bharti who was frustrated with the complex and expensive car rental process. What started as a single location with just five cars has grown into a nationwide service with 150+ locations.
            </p>
            <p className="mb-4 text-gray-700">
              Our commitment to transparent pricing and excellent customer service quickly set us apart. We were the first rental company to eliminate hidden fees and introduce all-inclusive pricing.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-semibold text-lg">Our Mission</h4>
                <p className="text-sm text-gray-600">Simplify car rental with technology and integrity</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Our Vision</h4>
                <p className="text-sm text-gray-600">Make transportation effortless for everyone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5e69edc2-4694-423e-8e3e-fce81058f0d7.png"
                  alt="Emily Park"
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">Emily Park</h4>
                  <p className="text-yellow-500">★★★★★</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I've rented from many companies, but RideEasy stands out. Their app makes pickup and dropoff so easy, and their vehicles are always clean and well-maintained."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d2f8a012-5627-4cbc-bb53-17ae31d91f8d.png"
                  alt="James Wilson"
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">James Wilson</h4>
                  <p className="text-yellow-500">★★★★★</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a frequent business traveler, I rely on RideeEasy's reliable service and 24/7 support. They've saved me more than once when my flight was delayed!"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a352f090-219e-41b7-a8f0-7f1228057fe2.png"
                  alt="Aisha Johnson"
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">Aisha Johnson</h4>
                  <p className="text-yellow-500">★★★★☆</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The no-pressure upgrade policy is game-changing. Renting a car used to be stressful but now I actually enjoy the process with RideeEasy."
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Our Team</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Press</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Locations</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">New York</a></li>
              <li><a href="#" className="hover:text-white">Los Angeles</a></li>
              <li><a href="#" className="hover:text-white">Chicago</a></li>
              <li><a href="#" className="hover:text-white">Miami</a></li>
              <li><a href="#" className="hover:text-white">View All</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center border-t border-gray-800 pt-8 mt-12">
          <p>© 2024 RideeEasy Car Rentals. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


