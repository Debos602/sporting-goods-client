1. Navbar & Footer
Navbar:
Includes the website logo and menu items: All Products, Manage Products, Cart, About Us.
Responsive and user-friendly design.
Footer:
Contains social media icons (Facebook, Twitter, Instagram, etc.).
Links to essential pages (All Products, About Us, Contact Us).
2. Homepage
Hero Section:
Carousel featuring discount information.
Visually appealing with smooth transitions.
Featured Section:
Displays the latest products in card view.
Cards include product name, category, stock, brand, rating (using react-rating), description, price, image, and a "View Details" button.
Clicking "View Details" redirects to the Single Product page.
Category Section:
Displays categories of sporting goods.
Clicking a category redirects to the All Products page filtered by that category.
Contact Us Section:
Form with fields for user input (name, email, message).
Optionally integrate EmailJS or NodeMailer for functionality.
3. About Us Page
Content:
Company information, mission and vision statements, contact details.
Sections for "Our Team" and "Our Store Locations".
4. All Products Page
Product Display:
Shows all available products with cards similar to the featured section.
Search Functionality:
Allows users to find specific products by name.
Filter & Sorting:
Filters by category, price, brand, rating, etc.
Sorting options (ascending/descending by price).
"Clear Filter" button to reset all filters.
5. Single Product Page
Detailed Product View:
Includes all product details: name, description, category, brand, stock, rating, price, image, and "Add to Cart" button.
Optionally use react-photo-view for image viewing.
Add to Cart Functionality:
Increases quantity up to the stock count. Disables the button when stock limit is reached.
6. Cart Page
Content:
Displays all products added to the cart.
Allows quantity adjustments and item removal.
Shows total price including 15% VAT.
"Proceed to Checkout" button: Activated if all products are in stock.
7. Checkout Page
User Details:
Form for name, email, phone number, and delivery address.
Payment Methods:
Cash on Delivery and Stripe (optional).
"Place Order" button redirects to a success page and updates the product stock.
8. Manage Products Page
Product Management:
Allows adding, deleting, and updating products using RTK Query.
Update form is prefilled with existing data for easy modifications.
Display modals/toasts for user feedback on actions.
9. Backend Integration
Requirements:
Integrate with the backend for product management, cart operations, and order processing.
10. Design Requirements
Visual Appeal:
Emphasis on user experience and sports-themed branding.
Responsiveness:
Ensure compatibility across devices (desktop, tablet, mobile).
Consistent Color Scheme:
Sports-related colors throughout the application.
