import React from "react";
import Image from "../../assets/images/image-4-removebg-preview.png";
import Image2 from "../../assets/images/image-5.jpg";
import Image3 from "../../assets/images/image-6.jpg";

const AboutUs: React.FC = () => {
    return (
        <div className="bg-amber-50">
            <div className="mt-[100px] max-w-screen-lg mx-auto bg-gradient-to-t from-amber-50 to-amber-100 ">
                {/* Company Information Section */}
                <section className="bg-gray-50 p-8 rounded-lg shadow-lg mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                        About Us
                    </h2>
                    <p className="text-lg text-gray-800 leading-relaxed">
                        We are a premier provider of top-notch sports goods,
                        dedicated to assisting our customers in achieving their
                        fitness aspirations. Our legacy spans over a decade,
                        during which we have been a trusted partner for athletes
                        and fitness enthusiasts, offering a diverse range of
                        high-quality products.
                    </p>
                    <h3 className="text-3xl font-semibold text-gray-900 my-6">
                        Mission & Vision
                    </h3>
                    <div className="">
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">
                            Our Mission
                        </h4>
                        <p className="text-lg text-gray-700">
                            Our mission is to empower individuals to lead
                            healthier lives by delivering innovative and
                            dependable sports products. We are committed to
                            excellence through superior quality, customer
                            satisfaction, and continuous improvement.
                        </p>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">
                                Our Vision
                            </h4>
                            <p className="text-lg text-gray-700">
                                We envision being the ultimate destination for
                                sports and fitness enthusiasts, renowned for our
                                exceptional product quality, outstanding
                                customer service, and commitment to fostering a
                                community of wellness. Our goal is to inspire
                                and support our customers in achieving their
                                fitness dreams.
                            </p>
                        </div>
                    </div>
                </section>
                {/* Mission and Vision Statements Section */}
                {/* <section className="bg-gray-50 p-8 rounded-lg shadow-lg mb-12"></section> */}
                {/* Our Team Section */}
                <section className="bg-gray-50 p-8  rounded-lg shadow-lg mb-12">
                    <h3 className="text-3xl font-semibold text-gray-900 mb-6">
                        Meet Our Team
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Team Member 1 */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-lg text-center">
                            <img
                                src={Image}
                                alt="John Doe"
                                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-300"
                            />
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">
                                Debos Das
                            </h4>
                            <p className="text-lg text-gray-600">
                                CEO & Founder
                            </p>
                            <p className="mt-2 text-gray-700">
                                Debos leads our team with over 20 years of
                                experience in the sports industry. His vision
                                and passion drive our company's success.
                            </p>
                        </div>

                        {/* Team Member 2 */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-lg text-center">
                            <img
                                src={Image2}
                                alt="Jane Smith"
                                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-300"
                            />
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">
                                Rupash das
                            </h4>
                            <p className="text-lg text-gray-600">
                                Product Manager
                            </p>
                            <p className="mt-2 text-gray-700">
                                Rupash oversees the development of our product
                                line, ensuring we offer the best sports goods to
                                our customers.
                            </p>
                        </div>

                        {/* Team Member 3 */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-lg text-center">
                            <img
                                src={Image3}
                                alt="Michael Brown"
                                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-300"
                            />
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">
                                Nishan das
                            </h4>
                            <p className="text-lg text-gray-600">
                                Customer Support Lead
                            </p>
                            <p className="mt-2 text-gray-700">
                                Michael ensures our customers receive the best
                                support and assistance, resolving queries and
                                providing solutions.
                            </p>
                        </div>
                    </div>
                </section>
                {/* Contact Information Section */}
                <section className="bg-gray-50 p-8 rounded-lg shadow-lg mb-12">
                    <h3 className="text-3xl font-semibold text-gray-900 mb-6">
                        Contact Information
                    </h3>
                    <div className="flex flex-col md:flex-row md:space-x-8">
                        <div className="md:w-1/2 mb-6">
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">
                                Address
                            </h4>
                            <p className="text-lg text-gray-700">
                                123 Sports Avenue, Suite 456 <br />
                                Fitness City, FC 78910
                            </p>
                        </div>
                        <div className="md:w-1/2 mb-6">
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">
                                Phone
                            </h4>
                            <p className="text-lg text-gray-700">
                                +1 (234) 567-8900
                            </p>
                        </div>
                        <div className="md:w-1/2 mb-6">
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">
                                Email
                            </h4>
                            <p className="text-lg text-gray-700">
                                Debos.das.02@gmail.com
                            </p>
                        </div>
                    </div>
                </section>
                {/* Store Location Information */}
            </div>
            <section className="bg-gray-50 text-center pt-8 rounded-lg shadow-lg">
                <h3 className="text-3xl font-semibold text-gray-900 mb-6">
                    Our Store Location
                </h3>
                <div>
                    <h4 className="text-xl font-semibold text-orange-800 mb-2">
                        Visit Us
                    </h4>
                    <p className="text-xl text-gray-700 mb-8">
                        Feel free to visit our store and explore our wide range
                        of sports products. Our team will be happy to assist
                        you.
                    </p>
                    <iframe
                        title="Store Location Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.0130932239546!2d-122.08424968469241!3d37.4221765798256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb8e4d5300267%3A0x6c16514d8d1c5ab3!2sGoogleplex!5e0!3m2!1sen!2sus!4v1623943184892!5m2!1sen!2sus"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
