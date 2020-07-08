using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DA.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Schulungskalender.Models;
using Schulungskalender.Services;

namespace DA.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class SchoolingsController : ControllerBase {

        private readonly SchoolingService schoolingService;

        public SchoolingsController(SchoolingService schoolingService) {
            this.schoolingService = schoolingService;
        }

        [HttpGet("Summary")]
        public List<SchoolingSummaryDTO> Summary() {
            return schoolingService.Summary();
        }

        [HttpGet("SchoolingDetails")]
        public SchoolingDetailDTO Details(int id) {
            return schoolingService.GetDetails(id);
        }

        [HttpPost("Registration")]
        public FullRegistrationDTO Register([FromBody] FullRegistrationDTO registration) {
            return schoolingService.Register(registration);
        }
    }
}
