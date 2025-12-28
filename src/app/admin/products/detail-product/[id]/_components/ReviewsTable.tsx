"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Star } from "lucide-react";
import { useGetReviewsByProduct } from "@/hooks/queries/useReview";
import { format } from "date-fns";

interface ReviewsTableProps {
  productId: number;
}

type RatingFilter = "all" | "5" | "4" | "3" | "2" | "1";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          key={idx}
          className={`h-4 w-4 ${
            idx < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewsTable({ productId }: ReviewsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("all");

  const { data: reviews = [], isLoading } = useGetReviewsByProduct(productId);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        review.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment?.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesRating = true;
      if (ratingFilter !== "all") {
        // Round rating to nearest integer for filtering
        matchesRating = Math.round(review.rating) === parseInt(ratingFilter);
      }

      return matchesSearch && matchesRating;
    });
  }, [reviews, searchTerm, ratingFilter]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return "0.0";
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const ratingDistribution = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      // Round rating to nearest integer for distribution
      const roundedRating = Math.round(review.rating);
      if (roundedRating >= 1 && roundedRating <= 5) {
        dist[roundedRating as keyof typeof dist]++;
      }
    });
    return dist;
  }, [reviews]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">
            Loading reviews...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3">
              <div className="text-4xl font-bold">{averageRating}</div>
              <div className="pb-1">
                <StarRating rating={Math.round(parseFloat(String(averageRating)))} />
                <p className="text-xs text-muted-foreground mt-1">
                  {reviews.length} reviews
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-base">Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm">{rating}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{
                      width: `${reviews.length > 0 ? (ratingDistribution[rating as keyof typeof ratingDistribution] / reviews.length) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {ratingDistribution[rating as keyof typeof ratingDistribution]}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Reviews ({filteredReviews.length}/{reviews.length})
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews by user or comment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select
              value={ratingFilter}
              onValueChange={(v) => setRatingFilter(v as RatingFilter)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">User</TableHead>
                  <TableHead className="w-[120px]">Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead className="w-[200px]">Images</TableHead>
                  <TableHead className="w-[150px]">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground py-8"
                    >
                      {reviews.length === 0
                        ? "No reviews yet"
                        : "No reviews found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReviews.map((review) => (
                    <TableRow key={review.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="font-medium">{review.user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          ID: {review.user.id}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <StarRating rating={review.rating} />
                          <Badge variant="outline" className="text-xs">
                            {review.rating}/5
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md">
                          <p className="text-sm line-clamp-3">
                            {review.comment || (
                              <span className="text-muted-foreground italic">
                                No comment
                              </span>
                            )}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {review.images && review.images.length > 0 ? (
                          <div className="flex gap-2 flex-wrap">
                            {review.images.slice(0, 3).map((img, idx) => (
                              <Image
                                key={idx}
                                src={img}
                                alt={`Review image ${idx + 1}`}
                                width={48}
                                height={48}
                                className="rounded-md object-cover border"
                              />
                            ))}
                            {review.images.length > 3 && (
                              <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center border">
                                <span className="text-xs text-muted-foreground">
                                  +{review.images.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            No images
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {format(new Date(review.createdAt), "MMM dd, yyyy")}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(review.createdAt), "hh:mm a")}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
