// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { useGetProductQuery } from '@/redux/api/baseApi';
import { TProducts } from '@/types';
import { FaRightLong } from 'react-icons/fa6';

export default function Review() {
  const { data: products, isLoading } = useGetProductQuery({
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  if (isLoading) {
    return <div className="text-center py-16">Loading products...</div>;
  }

  return (
    <div className='bg-[#f8f6f6]'>
      <div className="container mx-auto py-16 ">
        <div className="flex items-center mb-10">
          <h2 className="text-xl xl:ps-0 md:text-2xl font-bold text-amber-950 uppercase">
            Products Ratings
          </h2>
          <FaRightLong className="ms-3 text-amber-950" />
        </div>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={4}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 50,
            modifier: 1,
            slideShadows: true,
          }}
          loop={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
          breakpoints={{
            200: { // Small screens
              slidesPerView: 1,
            },
            320: { // Small screens
              slidesPerView: 1,
            },
            380: { // Small screens
              slidesPerView: 1,
            },
            480: { // Small screens
              slidesPerView: 1,
            },
            576: { // Small screens
              slidesPerView: 1,
            },
            640: { // Small screens
              slidesPerView: 1,
            },
            768: { // Medium screens
              slidesPerView: 2,
            },
            1024: { // Large screens
              slidesPerView: 4,
            },
          }}
        >
          {products.data?.map((product: TProducts) => (
            <SwiperSlide key={product._id} className='p-4'>
              <div className="flex flex-col items-center border rounded-lg shadow-md bg-gray-200 hover:bg-gradient-to-b  shadow-orange-950">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-w-sm object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold text-amber-950 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-amber-950 mb-2">{product.description}</p>
                <p className="text-amber-950 text-sm">
                  Rating: {product.rating} / 5
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
