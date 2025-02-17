import React from 'react';

function Footer() {
  return (
    <div>
      <footer className="py-6 text-white bg-blue-300">
        <div className="max-w-6xl px-4 mx-auto">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* About Us Section */}
            <div>
              <h5 className="mb-2 text-lg font-semibold">About Us</h5>
              <p className="text-sm">
                We provide the best quality pet food, toys, and accessories for your furry friends. Quality products to keep your pets happy and healthy.
              </p>
            </div>

            {/* Quick Links Section */}
            <div>
              <h5 className="mb-2 text-lg font-semibold">Quick Links</h5>
              <ul>
                <li><a href="/about" className="text-sm hover:underline">About Us</a></li>
                <li><a href="/shop" className="text-sm hover:underline">Shop</a></li>
                <li><a href="/contact" className="text-sm hover:underline">Contact Us</a></li>
                <li><a href="/terms" className="text-sm hover:underline">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* Contact Us Section */}
            <div>
              <h5 className="mb-2 text-lg font-semibold">Contact Us</h5>
              <p className="text-sm">123 Pet Street, Pet City, ABC</p>
              <p className="text-sm">Email: support@petfood.com</p>
              <p className="text-sm">Phone: +1 234 567 890</p>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="pt-4 mt-6 text-sm text-center border-t border-white">
            <p>&copy; 2024 PetFood. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
