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

        [HttpPost("Login")]
        public bool Login([FromBody] LoginUser user) {
           return backendService.Login(user);
        }

        [HttpGet("Summary")]
        public List<BackendSummaryDTO> Schoolings() {
            return backendService.GetSchoolings();
        }

        [HttpDelete("Summary/{id}")]
        public bool DeleteSchooling(int id) {
            return backendService.DeleteSchooling(id);
        }

        [HttpGet("Schoolings/{id}")]
        public BackendDetailDTO Schoolings(int id) {
            return backendService.GetSchoolings(id);
        }

        [HttpPost("Schoolings")]
        public bool InsertSchooling([FromBody] BackendDetailDTO schooling) {
            return backendService.InsertSchooling(schooling);
        }

        [HttpPut("Schoolings/{id}")]
        public bool EditSchooling(int id, [FromBody] BackendDetailDTO schooling) {
            schooling.Id = id;
            return backendService.EditSchooling(id, schooling);
        }

        //[HttpDelete("Participant")]
        //public bool EditParticipants([FromBody] DeleteDTO deleteDTO) {
        //    return true;
        //    //return backendService.EditParticipants(deleteDTO);
        //}

    }
}
