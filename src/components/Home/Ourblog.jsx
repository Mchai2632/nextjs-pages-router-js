import { Book, Calendar, Send, User } from "lucide-react";
import React from "react";
import { Input } from "../ui/form";
import Image from "next/image";
import Button from "../ui/Button/Button";

const blogList = [
  {
    id: 1,
    imgUrl: "https://picsum.photos/id/123/600/600",
    title: "How to build your first article?",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut eveniet minima nemo libero minus quia nihil, ab tempora quae soluta! minus quia nihil, ab tempora quae soluta! minus quia nihil, ab tempora quae soluta!",
    created_datetime: "12 Dec 2025",
  },
  {
    id: 2,
    imgUrl: "https://picsum.photos/id/142/600/600",
    title: "How to build your second article?",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut eveniet minima nemo libero minus quia nihil, ab tempora quae soluta! minus quia nihil, ab tempora quae soluta! minus quia nihil, ab tempora quae soluta!",
    created_datetime: "30 Jan 2026",
  },
  {
    id: 3,
    imgUrl: "https://picsum.photos/id/127/600/600",
    title: "How to build your third article?",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut eveniet minima nemo libero minus quia nihil, ab tempora quae soluta! minus quia nihil, ab tempora quae soluta! minus quia nihil, ab tempora quae soluta!",
    created_datetime: "12 Dec 2025",
  },
];

export default function OurBlog() {
  return (
    <section className="relative w-full flex flex-col bg-bg text-text  py-[3rem]">
      <div className="flex gap-1 md:gap-2 flex-col justify-center items-center">
        <h1>Our Blog</h1>
        <hr className="w-[10%]" />
        <p>Explore our latest posts</p>
      </div>
      {/* Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 mx-auto gap-[50px] px-4 sm:px-0 py-[26px]">
        {blogList.map((blog) => {
          return <BlogCard key={blog.id} data={blog} />;
        })}

        {/* Card */}
      </div>
    </section>
  );
}

function PilledTag({ Icon, label }) {
  return (
    <div className="inset-ring-1 inset-ring-current/40 text-text/50 inset-shadow-sm  rounded-full  flex gap-[5px] items-center justify-center px-[15px] py-[5px] ">
      <Icon className="h-full w-full" size={14} />
      <p className="geist-mono font-normal text-[12px] text-nowrap">{label}</p>
    </div>
  );
}

function BlogCard({ data }) {
  return (
    <div className="bg-bg-light rounded-[10px]  max-w-[360px] p-[35px] shadow-m hover:shadow-l transition-all hover:-translate-y-2 duration-300 flex flex-col">
      {/* image */}
      <div className="bg-bg aspect-square max-w-[200px] rounded-xl overflow-hidden">
        <Image width={600} height={600} src={data.imgUrl} alt="" className="object-cover object-center w-full h-full" />
      </div>
      {/* details */}
      <div className="flex-1 flex flex-col gap-[15px] items-start pb-0 pt-[30px] px-0">
        <div className="flex gap-2 flex-wrap">
          <PilledTag Icon={Calendar} label={data.created_datetime} />
        </div>

        <p
          title={data.title}
          className="flex-grow line-clamp-2   font-['Radio_Canada_Big:Regular',sans-serif] font-normal leading-[1.16] relative shrink-0 text-[36px] text-text tracking-[-1.8px] "
        >
          {data.title}
        </p>
        <p title={data.description} className="leading-none line-clamp-3 font-['Radio_Canada_Big:Regular',sans-serif]">
          {data.description}
        </p>

        <Button variant="outline" className="border-primary text-primary rounded-sm px-7 shadow-s hover:shadow-m">
          Read More
        </Button>
      </div>
    </div>
  );
}
