"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userId");
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 3 || searchQuery === "") {
      fetchCourses(1, true);
    }
  }, [searchQuery]);

  const fetchCourses = async (currentPage: number, reset = false) => {
    try {
      const res = await fetch(
        `/api/courses?page=${currentPage}&limit=6&search=${searchQuery}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch courses");

      const data = await res.json();

      setCourses(reset ? data.courses : [...courses, ...data.courses]);
      setPage(currentPage + 1);
      setHasMore(data.courses.length > 0);
    } catch (error) {
      console.log("🚀 ~ fetchCourses ~ error:", error);
      toast.error("Error loading courses");
    }
  };

  const handleAddToWishlist = async (courseId: string) => {
    if (!isLoggedIn) {
      toast.error("Please login to add to wishlist");
      return;
    }

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      if (!res.ok) throw new Error("Failed to add to wishlist");

      toast.success("✅ Added to Wishlist!");
    } catch (error) {
      toast.error("❌ Error adding to wishlist");
    }
  };

  return (
    <div className="container">
      <h1>Find Your Course</h1>
      <input
        type="text"
        placeholder="Search courses..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <InfiniteScroll
        dataLength={courses.length}
        next={() => fetchCourses(page)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="course-grid">
          {courses.map((course) => (
            <div key={course._id} className="course-card">
              <img src={course.thumbnail} alt={course.title} />
              <h3>{course.title}</h3>
              <p>${course.price}</p>
              <button onClick={() => handleAddToWishlist(course._id)}>
                ❤️ Add to Wishlist
              </button>
              <button onClick={() => router.push(`/course/${course.slug}`)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
