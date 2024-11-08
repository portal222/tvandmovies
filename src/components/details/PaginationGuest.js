

const PaginationGuest = (guestCast, pageSize) => {

   

    const pageCount = Math.ceil(guestCast.length / pageSize);
    return Array.from({ length: pageCount}, (_, index) =>
guestCast.slice(index * pageSize, (index + 1) * pageSize)
);
};
export default PaginationGuest;