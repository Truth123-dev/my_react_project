import { useParams } from "react-router-dom";
import { blogs } from "../data/Blogs";
import AuthorCard from "../components/AuthorCard";
import SocialShare from "../components/SocialShare";
import Comments from "../components/Comments";
import ReactionBar from "../components/ReactionBar";
import RecentPosts from "../components/RecentPosts";

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogs.find((item) => item.id === Number(id));

  if (!blog) {
    return <div className="text-center py-20 text-3xl">Blog not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-3 gap-10 mt-10">
        <div className="lg:col-span-2">
          <ReactionBar />

          <div className="space-y-6 mt-10">
            <p>{blog.description}</p>
            <p>
              ElijahVision Digital Solutions stands as a hub where exploration,
              knowledge, and innovation come together to inspire growth and
              progress.
            </p>
            <p>
              ElijahVision Digital Solutions is a brand built on clarity and
              creativity, offering modern approaches to digital challenges.
            </p>
          </div>

          <AuthorCard />
          <SocialShare />
          <Comments />
        </div>

        <div className="lg:col-span-1">
          <RecentPosts />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
