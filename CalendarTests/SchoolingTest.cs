using DA.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Schulungskalender.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace CalendarTests {
    [TestClass]
    public class CalendarTest {
        private SchoolingService schoolingService = new SchoolingService();


        [TestMethod]
        public void TestGetSchoolings() {
            var schoolings = schoolingService.Summary();
            Assert.IsTrue(schoolings.Count != 0);
        }
    }
}
