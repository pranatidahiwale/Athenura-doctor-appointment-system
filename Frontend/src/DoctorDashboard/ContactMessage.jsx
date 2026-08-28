 import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Mail,
  Phone,
  Eye,
  Trash2,
  X,
  Search,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const ContactMessage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch messages from backend on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://athenura-doctor-appointment-system.onrender.com/api/contact");
      // Assuming your backend returns an array of messages or an object containing them
      const data = Array.isArray(response.data) ? response.data : response.data.data || [];
      
      // Map backend fields to frontend expected fields if needed, 
      // ensuring fallback status/date if not provided by backend schema yet
      const formattedData = data.map((item, index) => ({
        id: item._id || index,
        name: item.fullName || "Anonymous",
        email: item.emailAddress || "",
        phone: item.phoneNumber || "N/A",
        subject: item.subject || "General Inquiry",
        message: item.message || "",
        date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent",
        status: item.status || "New",
      }));

      setMessages(formattedData);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter((message) =>
    `${message.name} ${message.email} ${message.subject}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleView = async (message) => {
    setSelectedMessage(message);

    if (message.status === "New") {
      setMessages((prev) =>
        prev.map((item) =>
          item.id === message.id
            ? { ...item, status: "Read" }
            : item
        )
      );
      // Optional: Update status in backend if you have a PATCH/PUT route set up
    }
  };

  const handleDelete = async (id) => {
    try {
      // If your backend supports delete: await axios.delete(`http://localhost:5000/api/contact/${id}`);
      setMessages((prev) => prev.filter((message) => message.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const markAsReplied = (id) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id
          ? { ...message, status: "Replied" }
          : message
      )
    );

    setSelectedMessage((prev) =>
      prev?.id === id
        ? { ...prev, status: "Replied" }
        : prev
    );
  };

  return (
    <div className="min-h-screen bg-[#f5faf9] p-6 md:p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#102a2a]">
            Contact Messages
          </h1>
          <p className="mt-2 text-[#647474]">
            Manage messages and enquiries received from patients.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white border border-[#dce9e7] rounded-xl px-5 py-3 shadow-sm">
          <Mail className="text-[#008f87]" size={20} />
          <div>
            <p className="text-xs text-[#7a8988]">
              Total Messages
            </p>
            <p className="text-lg font-bold text-[#102a2a]">
              {messages.length}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-[#dce9e7] p-4 mb-6 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8aa09d]"
          />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#dce9e7] outline-none focus:border-[#008f87] focus:ring-2 focus:ring-[#008f87]/10 text-sm"
          />
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white rounded-2xl border border-[#dce9e7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-[#f3f8f7] border-b border-[#dce9e7]">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-[#607270] uppercase">
                  Patient
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-[#607270] uppercase">
                  Contact
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-[#607270] uppercase">
                  Subject
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-[#607270] uppercase">
                  Date
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-[#607270] uppercase">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-xs font-bold text-[#607270] uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#edf2f1]">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-[#849391]">
                    <div className="flex justify-center items-center gap-2">
                      <Loader2 className="animate-spin text-[#008f87]" size={24} />
                      <span>Loading messages...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-[#849391]">
                    No contact messages found. Make sure your backend server is running.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((message) => (
                  <tr
                    key={message.id}
                    className="hover:bg-[#f8fbfa] transition"
                  >
                    {/* Patient */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#dff4f1] text-[#007c75] flex items-center justify-center font-bold">
                          {message.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#172d2d]">
                            {message.name}
                          </p>
                          <p className="text-xs text-[#82908f] mt-1">
                            Patient
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-[#526260]">
                        <Mail size={14} />
                        {message.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#899694] mt-2">
                        <Phone size={13} />
                        {message.phone}
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="px-6 py-5">
                      <p className="font-medium text-[#344847]">
                        {message.subject}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">
                      <p className="text-sm text-[#657472]">
                        {message.date}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      {message.status === "New" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">
                          <Clock size={13} />
                          New
                        </span>
                      )}
                      {message.status === "Read" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                          <Eye size={13} />
                          Read
                        </span>
                      )}
                      {message.status === "Replied" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                          <CheckCircle2 size={13} />
                          Replied
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleView(message)}
                          title="View Details"
                          className="p-2.5 rounded-lg bg-[#e5f5f2] text-[#007c75] hover:bg-[#d3eeea] transition"
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          onClick={() => handleDelete(message.id)}
                          title="Delete"
                          className="p-2.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-[#e5eeee]">
              <div>
                <h2 className="text-xl font-bold text-[#102a2a]">
                  Message Details
                </h2>
                <p className="text-sm text-[#81908e] mt-1">
                  Contact enquiry from patient
                </p>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="w-10 h-10 rounded-xl hover:bg-[#f1f6f5] flex items-center justify-center text-[#526260]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-7 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs font-semibold text-[#899694] uppercase mb-2">
                    Patient Name
                  </p>
                  <p className="font-semibold text-[#172d2d]">
                    {selectedMessage.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#899694] uppercase mb-2">
                    Email
                  </p>
                  <p className="font-semibold text-[#172d2d] break-all">
                    {selectedMessage.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#899694] uppercase mb-2">
                    Phone
                  </p>
                  <p className="font-semibold text-[#172d2d]">
                    {selectedMessage.phone}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#899694] uppercase mb-2">
                    Date
                  </p>
                  <p className="font-semibold text-[#172d2d]">
                    {selectedMessage.date}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#899694] uppercase mb-2">
                  Subject
                </p>
                <div className="bg-[#f5faf9] border border-[#e0ecea] rounded-xl px-4 py-3 text-[#344847] font-medium">
                  {selectedMessage.subject}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#899694] uppercase mb-2">
                  Message
                </p>
                <div className="bg-[#f8faf9] border border-[#e0e9e7] rounded-xl p-5 text-sm text-[#4c5d5b] leading-7">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {selectedMessage.status !== "Replied" && (
                  <button
                    onClick={() => markAsReplied(selectedMessage.id)}
                    className="flex-1 py-3 rounded-xl bg-[#00877f] text-white font-semibold hover:bg-[#006f68] transition"
                  >
                    Mark as Replied
                  </button>
                )}
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="flex-1 py-3 rounded-xl border border-[#dce8e6] text-[#526260] font-semibold hover:bg-[#f5f8f7] transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessage;