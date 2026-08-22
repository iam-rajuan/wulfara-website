"use client";

import { use } from "react";
import { 
  ChevronRight, 
  MessageSquare, 
  Download, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Box, 
  Calendar, 
  Paperclip, 
  FileText,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useGetRfqByIdQuery, useGetRfqMessagesQuery, useLazyGetRfqAttachmentDownloadUrlQuery } from "@/store/api/rfqApi";

export default function RfqDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Use React.use() for params in Client Components (Next.js 15+)
  const resolvedParams = use(params);
  const rfqId = resolvedParams.id;
  
  const { data: rfqResponse, isLoading, error } = useGetRfqByIdQuery(rfqId, { skip: !rfqId });
  const { data: messagesResponse, isLoading: isLoadingMessages } = useGetRfqMessagesQuery(rfqId, { skip: !rfqId });
  const [triggerDownload] = useLazyGetRfqAttachmentDownloadUrlQuery();
  
  const rfq = rfqResponse?.data;
  const messages = messagesResponse?.data || [];

  const handleDownload = async (url: string, type: 'view' | 'download' = 'view') => {
    try {
      const res = await triggerDownload({ url, type }).unwrap();
      if (res.data?.downloadUrl) {
        window.open(res.data.downloadUrl, '_blank');
      }
    } catch (err) {
      console.error('Failed to get download URL:', err);
    }
  };

  if (isLoading || isLoadingMessages) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-[#DFB63E]" />
        <p className="text-sm text-gray-500 font-bold">Loading RFQ details...</p>
      </div>
    );
  }

  if (error || !rfq) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-16">
        <div className="text-red-500 text-lg font-bold mb-2">Failed to load RFQ</div>
        <p className="text-sm text-gray-500 mb-6">The RFQ does not exist or you do not have permission to view it.</p>
        <Link href="/dashboard/rfqs" className="px-5 py-2.5 bg-[#DFB63E] text-black font-bold rounded-md hover:bg-[#cba433] transition-colors text-sm shadow-sm">
          Back to My RFQs
        </Link>
      </div>
    );
  }

  // Parse details packed string: Expected Delivery & Unit
  let deadline = "Not set";
  let unit = "Units";
  let additionalNotes = rfq.details || "";

  if (rfq.details) {
    const deadlineMatch = rfq.details.match(/Expected Delivery: (.+?)\n/);
    if (deadlineMatch) deadline = deadlineMatch[1];
    
    const unitMatch = rfq.details.match(/Unit: (.+?)\n/);
    if (unitMatch) unit = unitMatch[1];
    
    const parts = rfq.details.split("\n\n");
    if (parts.length > 1) {
      additionalNotes = parts.slice(1).join("\n\n");
    }
  }

  interface ParsedQuote {
    id: string;
    senderName: string;
    senderAvatar: string;
    price: string;
    isNegotiable: boolean;
    timeline: string;
    shippingNotes: string;
    messageText: string;
    attachments: string[];
    createdAt: string;
  }

  const quoteMessages = (messages || [])
    .map((rawMsg) => {
      const msg = rawMsg as {
        _id: string;
        text?: string;
        sender?: { name?: string; avatar?: string };
        attachments?: string[];
        createdAt: string;
      };
      const text = msg.text || "";
      if (!text.includes("[QUOTE DETAILS]")) return null;

      // Parse fields using regex
      const priceMatch = text.match(/Price: \$(.+?)(?: \((Negotiable|Fixed)\))?\n/);
      const timelineMatch = text.match(/Timeline: (.+?)\n/);
      const shippingMatch = text.match(/Shipping Notes: (.+?)\n/);
      const messageMatch = text.match(/\[MESSAGE\]\n([\s\S]+)$/);

      const price = priceMatch ? priceMatch[1] : "0.00";
      const isNegotiable = priceMatch ? priceMatch[2] === "Negotiable" : false;
      const timeline = timelineMatch ? timelineMatch[1] : "N/A";
      const shippingNotes = shippingMatch ? shippingMatch[1] : "None";
      const messageText = messageMatch ? messageMatch[1].trim() : "";

      return {
        id: msg._id,
        senderName: msg.sender?.name || "Supplier",
        senderAvatar: msg.sender?.avatar || "",
        price,
        isNegotiable,
        timeline,
        shippingNotes,
        messageText,
        attachments: msg.attachments || [],
        createdAt: msg.createdAt
      } as ParsedQuote;
    })
    .filter((q): q is ParsedQuote => q !== null);

  const handleDownloadDetails = () => {
    const detailsContent = `RFQ ID: ${rfq.rfqNumber || rfq._id}
Product: ${rfq.subject?.replace("RFQ: ", "")}
Quantity: ${rfq.quantity} ${unit}
Deadline: ${deadline}

Notes / Specifications:
${additionalNotes}`;

    const blob = new Blob([detailsContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${rfq.rfqNumber || rfq._id}_details.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilenameFromUrl = (url: string) => {
    try {
      const decoded = decodeURIComponent(url);
      return decoded.substring(decoded.lastIndexOf('/') + 1) || "attachment";
    } catch {
      return "attachment";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-10">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-6">
        <Link href="/dashboard" className="hover:text-gray-900 transition-colors">Dashboard</Link>
        <ChevronRight size={14} />
        <Link href="/dashboard/rfqs" className="hover:text-gray-900 transition-colors">My RFQs</Link>
        <ChevronRight size={14} />
        <span className="font-semibold text-gray-900 truncate max-w-[150px]">{rfq.rfqNumber || rfq._id}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[#0B172E] tracking-tight leading-tight">
            {rfq.rfqNumber || rfq._id} — {rfq.subject?.replace("RFQ: ", "")}
          </h1>
          <span className="inline-block text-[12px] font-bold px-3 py-1 rounded-full border border-[#F97316] text-[#F97316] bg-[#FFF7ED] uppercase tracking-wider w-fit">
            {rfq.status || "Pending"}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href={`/dashboard/messages?new=${rfq.supplier?.user}&name=${encodeURIComponent(rfq.supplier?.companyName || 'Supplier')}`}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <MessageSquare size={16} />
            Message Supplier
          </Link>
          <button 
            onClick={handleDownloadDetails}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Download size={16} />
            Download Details
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
              <div className="w-16 h-16 bg-[#E0E7FF] rounded-md flex items-center justify-center text-[#3730A3] font-black shrink-0 border border-gray-200">
                {rfq.supplier?.logo ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={rfq.supplier.logo} alt="Logo" className="w-full h-full object-cover rounded-md" />
                  </>
                ) : (
                  <Building2 size={24} />
                )}
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#0B172E] mb-1">
                  {rfq.supplier?.companyName || "Unknown Supplier"}
                </h3>
                <div className="flex items-center gap-3 text-[13px] text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    {rfq.supplier?.contactInfo?.address || "Global"}
                  </div>
                  {rfq.supplier?.isApproved && (
                    <div className="flex items-center gap-1 text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded text-[11px] font-bold">
                      <CheckCircle2 size={12} className="text-[#D97706]" />
                      Verified
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Link 
              href={`/suppliers/${rfq.supplier?._id}`}
              className="px-4 py-2 border border-gray-300 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              View Profile
            </Link>
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
              <p className="text-[14px] font-medium text-[#0B172E]">{rfq.rfqNumber || rfq._id}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Product</p>
              <p className="text-[14px] font-medium text-[#0B172E]">{rfq.subject?.replace("RFQ: ", "")}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Quantity</p>
              <p className="text-[14px] font-medium text-[#0B172E]">{rfq.quantity} {unit}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Deadline</p>
              <div className="flex items-center gap-1 text-[14px] font-medium text-[#0B172E]">
                <Calendar size={14} className="text-red-500 animate-pulse" />
                {deadline}
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Notes / Specifications</p>
            <div className="bg-[#F9FAFB] border border-gray-200 p-4 rounded-md text-[13px] text-gray-600 leading-relaxed whitespace-pre-wrap">
              {additionalNotes || "No specifications provided."}
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Paperclip size={20} className="text-[#DFB63E]" />
            <h2 className="text-[18px] font-bold text-[#0B172E]">Attachments</h2>
          </div>

          {rfq.attachments && rfq.attachments.length > 0 ? (
            <div className="space-y-3">
              {rfq.attachments.map((attachmentUrl: string, idx: number) => {
                const fileName = getFilenameFromUrl(attachmentUrl);
                return (
                  <div 
                    key={idx} 
                    className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group"
                  >
                    <div 
                      onClick={() => handleDownload(attachmentUrl, 'view')}
                      className="flex-1 flex items-center gap-3 cursor-pointer"
                    >
                      <FileText size={24} className="text-red-500 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[13px] font-bold text-[#0B172E] group-hover:text-[#DFB63E] transition-colors truncate max-w-[280px] sm:max-w-md">{fileName}</p>
                        <p className="text-[11px] text-gray-400">Attached File (Click to view)</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDownload(attachmentUrl, 'download')}
                      title="Download attachment"
                      className="text-gray-400 hover:text-[#DFB63E] transition-colors p-2 cursor-pointer focus:outline-none shrink-0"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6 text-sm text-gray-400 border border-dashed border-gray-200 rounded-md">
              No attachments uploaded with this RFQ.
            </div>
          )}
        </div>

        {/* Quote Responses from Supplier */}
        {quoteMessages.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-[#DFB63E]" />
                <h2 className="text-[18px] font-bold text-[#0B172E]">Quote Responses ({quoteMessages.length})</h2>
              </div>
              <span className="text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Active Proposal
              </span>
            </div>

            <div className="space-y-6">
              {quoteMessages.map((quote, idx) => (
                <div key={quote.id || idx} className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-all bg-[#FAFAFA]/50 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Supplier Meta */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E0E7FF] border border-gray-150 flex items-center justify-center font-bold text-[#3730A3] shrink-0 overflow-hidden">
                        {(rfq.supplier?.logo || quote.senderAvatar) ? (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={rfq.supplier?.logo || quote.senderAvatar} alt={quote.senderName} className="w-full h-full object-cover" />
                          </>
                        ) : (
                          <span>{quote.senderName.substring(0, 2).toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0B172E]">{quote.senderName}</h4>
                        <p className="text-[11px] text-gray-400">
                          Submitted on {new Date(quote.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                      </div>
                    </div>

                    {/* Pricing Display */}
                    <div className="flex items-center gap-2.5">
                      <div className="text-right">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Quote Price</span>
                        <span className="text-[20px] font-black text-[#0B172E]">${quote.price}</span>
                      </div>
                      {quote.isNegotiable ? (
                        <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-extrabold rounded-full uppercase tracking-wide">
                          Negotiable
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-500 text-[10px] font-extrabold rounded-full uppercase tracking-wide">
                          Fixed Price
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white border border-gray-100 p-4 rounded-lg text-sm">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Delivery Timeline</p>
                      <p className="font-bold text-[#0B172E]">{quote.timeline}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Shipping Notes</p>
                      <p className="font-semibold text-gray-600">{quote.shippingNotes}</p>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Proposal Message</p>
                    <div className="text-xs text-gray-600 bg-white border border-gray-150 p-4 rounded-lg leading-relaxed whitespace-pre-wrap">
                      {quote.messageText}
                    </div>
                  </div>

                  {/* Attachments */}
                  {quote.attachments.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Quote Document</p>
                      {quote.attachments.map((url, uidx) => (
                        <div 
                          key={uidx} 
                          className="w-full flex items-center justify-between p-3 bg-white border border-gray-155 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div 
                            onClick={() => handleDownload(url, 'view')}
                            className="flex-1 flex items-center gap-2 cursor-pointer"
                          >
                            <FileText size={16} className="text-red-500 shrink-0" />
                            <span className="text-xs font-bold text-[#0B172E] group-hover:text-[#DFB63E] transition-colors truncate max-w-[200px] sm:max-w-md">
                              {getFilenameFromUrl(url)} (Click to view)
                            </span>
                          </div>
                          <button 
                            onClick={() => handleDownload(url, 'download')}
                            title="Download document"
                            className="text-gray-400 hover:text-[#DFB63E] transition-colors p-1.5 focus:outline-none cursor-pointer shrink-0"
                          >
                            <Download size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Negotiate Action Block */}
                  {quote.isNegotiable && (
                    <div className="mt-4 p-3 bg-amber-50/80 border border-amber-200/50 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-0.5">
                        <span className="text-amber-800 font-bold block">Negotiable Price Offered</span>
                        <span className="text-gray-500 font-medium">You can negotiate terms directly with the supplier.</span>
                      </div>
                      <Link 
                        href={`/dashboard/messages?new=${rfq.supplier?.user}&name=${encodeURIComponent(rfq.supplier?.companyName || 'Supplier')}`}
                        className="w-full sm:w-auto px-4 py-2 bg-[#DFB63E] hover:bg-[#cba433] text-black font-extrabold text-center rounded transition-colors shadow-sm"
                      >
                        Negotiate Price
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
