import Image from "next/image";
import Link from "next/link";
import { FaCircle } from "react-icons/fa";

const Card = ({
  title,
  description,
  bannerImage,
  categoryName,
  categorySlug,
  categoryTextColor,
  categoryBackgroundColor,
}) => {
  return (
    <div className={`bg-white rounded-xl overflow-hidden grow`}>
      {/* <!-- Card img --> */}
      <div className="relative rounded-xl overflow-hidden">
        <Image
          width={600}
          height={450}
          className="w-full"
          src={bannerImage}
          alt="Card image"
        />
        {categoryName && (
          <Link
            href={`/${categorySlug}`}
            className={`absolute bottom-4 left-4 flex items-center gap-2 text-[13px] px-2 py-1 rounded ${categoryTextColor} ${categoryBackgroundColor}`}
          >
            <FaCircle className={`text-xs ${categoryTextColor} `} />
            {categoryName}
          </Link>
        )}
      </div>
      <div className="py-3">
        <h4 className={`font-bold text-[#191A1F]`}>
          <Link href="post-single.html" className=" btn-link">
            {title}
          </Link>
        </h4>
        <p className="text-[#595D69] text-15 line-clamp-3 ">{description}</p>
        {/* <!-- Card info --> */}
        {/* <ul className="flex items-center space-x-2 mt-4 text-sm">
          <li className="flex items-center">
            <Image
              width={100}
              height={100}
              className="w-8 h-8 rounded-full"
              src={item.authorImg}
              alt="avatar"
            />
            <span className="ml-2 text-[#595D69] text-15">
              by{" "}
              <Link href="#" className=" btn-link">
                {item.authorName}
              </Link>
            </span>
          </li>
          <li className="mx-4 size-1 rounded-full bg-[#595D69]"></li>
          <li className="ml-auto text-[#595D69] text-15">{item.date}</li>
        </ul> */}
      </div>
    </div>
  );
};

export default Card;
