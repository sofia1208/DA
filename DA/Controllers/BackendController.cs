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

        [HttpPut("UpdateDisplay/{id}")]
        public bool UpdateDisplay(int id, [FromBody] bool isDisplayed) {
            return backendService.UpdateDisplay(id, isDisplayed);
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

        [HttpGet("Organizers")]
        public List<OrganizerDTO> Organizers() {
            return backendService.GetOrganizers();
        }

        [HttpPost("Organizers")]
        public bool AddCategories([FromBody] OrganizerDTO organizer) {
            return backendService.AddOrganizer(organizer);
        }

        [HttpPut("Organizers/{id}")]
        public bool UpdateCategory(int id, [FromBody] OrganizerDTO organizer) {
            organizer.Id = id;
            return backendService.UpdateOrganizer(organizer);
        }

        [HttpGet("Companies")]
        public List<string> Companies() {
            return backendService.GetCompanies();
        }

        [HttpGet("Categories")]
        public List<CategoryDto> Categories() {
            return backendService.GetCategories();
        }


        [HttpPost("Categories")]
        public bool AddCategories([FromBody] CategoryDto category) {
            return backendService.AddCategory(category);
        }

        [HttpPut("Categories/{id}")]
        public bool UpdateCategory(int id, [FromBody] CategoryDto category) {
            category.Id = id;
            return backendService.UpdateCategory(category);
        }

    }
}
