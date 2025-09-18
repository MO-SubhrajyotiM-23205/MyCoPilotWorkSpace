using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Data.SqlClient;

namespace API_CORPUS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CorpusDetailsController : ControllerBase
    {
        private readonly ILogger<CorpusDetailsController> _logger;
        private readonly string _connectionString;

        public CorpusDetailsController(ILogger<CorpusDetailsController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        [HttpPost]
        public async Task<IActionResult> CreateCorpusDetails([FromBody] CorpusDetails request)
        {
            try
            {
                _logger.LogInformation("CreateCorpusDetails called for ClientCode: {ClientCode}", request?.ClientCode);

                if (request == null)
                {
                    _logger.LogWarning("CreateCorpusDetails called with null request");
                    return BadRequest("Request body is required");
                }

                // Call stored procedure USP_CORPUS_DETAILS
                using var connection = new SqlConnection(_connectionString);
                using var command = new SqlCommand("USP_CORPUS_DETAILS", connection)
                {
                    CommandType = CommandType.StoredProcedure
                };

                command.Parameters.AddWithValue("@CorpusType", request.CorpusType);
                command.Parameters.AddWithValue("@Amount", request.Amount);
                command.Parameters.AddWithValue("@DepositionMode", request.DepositionMode);
                command.Parameters.AddWithValue("@ChequeNo", (object)request.ChequeNo ?? DBNull.Value);
                command.Parameters.AddWithValue("@CMSChequePath", request.CMSChequePath ?? string.Empty);
                command.Parameters.AddWithValue("@UTRNo", request.UTRNo ?? string.Empty);
                command.Parameters.AddWithValue("@UTRPath", request.UTRPath ?? string.Empty);
                command.Parameters.AddWithValue("@SplitOption", request.SplitOption ?? string.Empty);
                command.Parameters.AddWithValue("@SplitPath", request.SplitPath ?? string.Empty);
                command.Parameters.AddWithValue("@WaiverOption", request.WaiverOption ?? string.Empty);
                command.Parameters.AddWithValue("@WaiverPath", request.WaiverPath ?? string.Empty);
                command.Parameters.AddWithValue("@UserId", request.UserId);
                command.Parameters.AddWithValue("@ClientCode", request.ClientCode);
                command.Parameters.AddWithValue("@CashVisaCopy", request.CashVisaCopy ?? string.Empty);
                command.Parameters.AddWithValue("@CashImmigrationCopy", request.CashImmigrationCopy ?? string.Empty);

                await connection.OpenAsync();
                var newId = await command.ExecuteScalarAsync();

                _logger.LogInformation("CorpusDetails created successfully with ID: {Id} for ClientCode: {ClientCode}", newId, request.ClientCode);

                return Ok(new { Id = Convert.ToInt32(newId), Message = "Corpus details created successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating corpus details for ClientCode: {ClientCode}", request?.ClientCode);
                return StatusCode(500, "An error occurred while processing your request");
            }
        }
    }
}