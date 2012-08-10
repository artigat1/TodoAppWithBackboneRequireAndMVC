using System.Web.Script.Serialization;

namespace Todo.Helpers
{
    public static class JsonHelper
    {
        /// <summary>
        /// Converts an object to a JSON string.
        /// </summary>
        /// <param name="obj">The object to serialize.</param>
        /// <returns>The serialized JSON string.</returns>
        public static string ToJson(this object obj)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(obj);
        }
    }
}