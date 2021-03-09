namespace DatingApp.API.Helpers
{
    public class PaginationHeader
    {
        public PaginationHeader(int curentPages, int itemsPerPage, int totalItems, int totalPages)
        {
            CurentPages = curentPages;
            ItemsPerPage = itemsPerPage;
            TotalItems = totalItems;
            TotalPages = totalPages;
        }

        public int CurentPages { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
    }
}