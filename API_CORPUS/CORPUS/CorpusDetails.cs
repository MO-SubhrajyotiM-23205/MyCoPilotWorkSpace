namespace API_CORPUS
{
    public class CorpusDetails
    {
        public string CorpusType { get; set; }
        public decimal Amount { get; set; }
        public string DepositionMode { get; set; }
        public decimal? ChequeNo { get; set; }
        public string CMSChequePath { get; set; }
        public string UTRNo { get; set; }
        public string UTRPath { get; set; }
        public string SplitOption { get; set; }
        public string SplitPath { get; set; }
        public string WaiverOption { get; set; }
        public string WaiverPath { get; set; }
        public decimal UserId { get; set; }
        public string ClientCode { get; set; }
        public string CashVisaCopy { get; set; }
        public string CashImmigrationCopy { get; set; }
    }
}