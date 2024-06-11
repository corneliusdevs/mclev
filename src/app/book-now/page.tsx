import MaxwidthWrapper from "@/components/Max_Min_widthWrapper";
import BookACleaner from "@/components/book-a-cleaner/BookACleaner";

const BooknowPage = () => {
  return (
    <main>
      <MaxwidthWrapper>
        {/* choose a service section */}
        <div>
          <BookACleaner />
        </div>
      </MaxwidthWrapper>
    </main>
  );
};

export default BooknowPage;
