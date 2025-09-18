using Microsoft.AspNetCore.Mvc;
using API_CORPUS.Data;

namespace API_CORPUS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CorpusController : ControllerBase
    {
        private readonly ILogger<CorpusController> _logger;
        private readonly CorpusDbContext _context;

        public CorpusController(ILogger<CorpusController> logger, CorpusDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet("search/{clientId}")]
        public async Task<IActionResult> SearchCorpus(string clientId)
        {
            try
            {
                _logger.LogInformation("SearchCorpus called for ClientId: {ClientId}", clientId);

                if (string.IsNullOrEmpty(clientId))
                {
                    _logger.LogWarning("SearchCorpus called with empty ClientId");
                    return BadRequest("ClientId is required");
                }

                var result = await _context.GetAccountDataAsync(clientId);

                _logger.LogInformation("SearchCorpus completed for ClientId: {ClientId}, Found {Count} records", clientId, result.Count);

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while searching corpus for ClientId: {ClientId}. Error: {ErrorMessage}", clientId, ex.Message);
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
    }
}