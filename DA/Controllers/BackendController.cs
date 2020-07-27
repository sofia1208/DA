using DA.Models.DTOs;
using DA.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DA.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class BackendController {
        private readonly BackendService backendService;

        public BackendController(BackendService schoolingService) {
            this.backendService = schoolingService;
        }

        [HttpGet("Schoolings")]
        public void Schoolings() {
            backendService.GetSchoolings();
        }

        [HttpGet("Schoolings/{id}")]
        public BackendDetailDTO Schoolings(int id) {
            return backendService.GetSchoolings(id);
        }

        [HttpPut("EditSchooling/{id}")]
        public string EditSchooling(int id, [FromBody] BackendDetailDTO schooling) {
            return backendService.EditSchooling(schooling);
        }

    }
}
