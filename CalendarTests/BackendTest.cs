
using DA.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CalendarTests {
    [TestClass]
    public class BackendTest {
        private BackendService backendService= new BackendService();
 

        [TestMethod]
        public void TestGetSchoolings() {
            var schoolings = backendService.GetSchoolings();
            schoolings.ForEach(x => Assert.IsTrue(x.Display));
            Assert.IsTrue(schoolings.Count != 0);
        }
    }
}
 