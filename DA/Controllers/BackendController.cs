﻿using DA.Models.DTOs;
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

        [HttpGet("Login/{username}/{password}")]
        public bool Login(string username, string password) {
           return backendService.Login(username, password);
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
            schooling.Id = id;
            return backendService.EditSchooling(id, schooling);
        }

        [HttpPost("InsertSchooling")]
        public string InsertSchooling([FromBody] BackendDetailDTO schooling) {
            return backendService.InsertSchooling(schooling);
        }

    }
}