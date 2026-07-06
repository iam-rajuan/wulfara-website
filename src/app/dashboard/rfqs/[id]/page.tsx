import { 
  ChevronRight, 
  MessageSquare, 
  Download, 
  Building2, 
  MapPin, 
  CheckCircle, 
  Box, 
  Calendar, 
  Paperclip, 
  FileText, 
  Image as ImageIcon 
} from "lucide-react";
import Link from "next/link";

export default async function RfqDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Await params for Next.js 15+ compatibility
  const resolvedParams = await params;
  const rfqId = resolvedParams.id || "RFQ-1048";
  
  return (
    <div className="w-full max-w-4xl mx-auto pb-10">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-6">
        <Link href="/dashboard" className="hover:text-gray-900 transition-colors">Dashboard</Link>
        <ChevronRight size={14} />
        <Link href="/dashboard/rfqs" className="hover:text-gray-900 transition-colors">My RFQs</Link>
        <ChevronRight size={14} />
        <span className="font-semibold text-gray-900">{rfqId}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <h1 className="text-[32px] font-bold text-[#0B172E] tracking-tight">
            {rfqId} — Steel sheets and pipes
          </h1>
          <span className="inline-block text-[12px] font-bold px-3 py-1 rounded-full border border-[#F97316] text-[#F97316] bg-[#FFF7ED]">
            Pending
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
            <MessageSquare size={16} />
            Message Supplier
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
            <Download size={16} />
            Download Details
          </button>
        </div>
        <div className="mt-4">
          <button className="text-[13px] font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer">
            Close RFQ
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        
        {/* Supplier Information */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Building2 size={20} className="text-[#DFB63E]" />
            <h2 className="text-[18px] font-bold text-[#0B172E]">Supplier Information</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#E0E7FF] rounded-md flex items-center justify-center text-[#3730A3]">
                <Building2 size={24} />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#0B172E] mb-1">Steel Company A</h3>
                <div className="flex items-center gap-3 text-[13px] text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    New York
                  </div>
                  <div className="flex items-center gap-1 text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded text-[11px] font-bold">
                    <CheckCircle size={12} />
                    Verified
                  </div>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
              View Profile
            </button>
          </div>
        </div>

        {/* RFQ Details */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Box size={20} className="text-[#DFB63E]" />
            <h2 className="text-[18px] font-bold text-[#0B172E]">RFQ Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 mb-8">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">RFQ ID</p>
              <p className="text-[14px] font-medium text-[#0B172E]">{rfqId}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Product</p>
              <p className="text-[14px] font-medium text-[#0B172E]">Steel sheets and pipes</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Quantity</p>
              <p className="text-[14px] font-medium text-[#0B172E]">500 units</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Deadline</p>
              <div className="flex items-center gap-1 text-[14px] font-medium text-[#0B172E]">
                <Calendar size={14} className="text-red-500" />
                Jul 15 2026
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Notes / Specifications</p>
            <div className="bg-[#F9FAFB] border border-gray-200 p-4 rounded-md text-[13px] text-gray-600 leading-relaxed">
              Require high-grade industrial steel sheets (10mm thickness) and seamless pipes (schedule 40). Must meet ASTM A36 standards. Delivery required to central warehouse in Brooklyn. Please include estimated freight costs in the quotation.
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Paperclip size={20} className="text-[#DFB63E]" />
            <h2 className="text-[18px] font-bold text-[#0B172E]">Attachments</h2>
          </div>

          <div className="space-y-3">
            {/* Attachment 1 */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-red-500" />
                <div>
                  <p className="text-[13px] font-bold text-[#0B172E]">specification.pdf</p>
                  <p className="text-[11px] text-gray-500">2.4 MB</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <Download size={18} />
              </button>
            </div>

            {/* Attachment 2 */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <ImageIcon size={24} className="text-yellow-500" />
                <div>
                  <p className="text-[13px] font-bold text-[#0B172E]">reference.png</p>
                  <p className="text-[11px] text-gray-500">850 KB</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
