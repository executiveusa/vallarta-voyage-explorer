import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

// Simple protection: Check if user is logged in. 
// Real RLS policies will prevent unauthorized data access/updates regardless of UI.

const AdminPanel = () => {
  const { user, session } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data states
  const [photos, setPhotos] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
        // Simple client-side check, security is in RLS
        // In a real app we'd fetch profile role
        setIsAdmin(true); 
        fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    // Fetch Pending Photos
    const { data: pData } = await supabase.from('sunset_photos').select('*').eq('status', 'pending');
    if (pData) setPhotos(pData);

    // Fetch Pending Claims
    const { data: cData } = await supabase.from('listing_claims').select('*, listings(name)').eq('status', 'pending');
    if (cData) setClaims(cData);

    // Fetch Recent Bookings
    const { data: bData } = await supabase.from('booking_intents').select('*').order('created_at', { ascending: false }).limit(20);
    if (bData) setBookings(bData);
    
    setLoading(false);
  };

  const handlePhotoAction = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase.from('sunset_photos').update({ 
        status, 
        approved_at: status === 'approved' ? new Date().toISOString() : null 
      }).eq('id', id);
      
      if (error) throw error;
      
      toast.success(`Photo ${status}`);
      setPhotos(photos.filter(p => p.id !== id));
      
      // Analytics
      import("@/lib/analytics").then(({ trackEvent }) => 
        trackEvent(status === 'approved' ? 'admin_photo_approved' : 'admin_photo_rejected', { photo_id: id })
      );

    } catch (err) {
      console.error(err);
      toast.error("Failed to update photo. Check permissions.");
    }
  };

  const handleClaimAction = async (claim: any, status: 'approved' | 'rejected') => {
    if (status === 'approved') {
        // 1. Approve Claim
        const { error: cError } = await supabase.from('listing_claims').update({ status }).eq('id', claim.id);
        // 2. Update Listing (Assign ownership logic would go here, for now just marking claimed)
        const { error: lError } = await supabase.from('listings').update({ claim_status: 'claimed' }).eq('id', claim.listing_id);
        
        if (cError || lError) toast.error("Operation failed");
        else {
            toast.success("Claim approved & listing updated");
            setClaims(claims.filter(c => c.id !== claim.id));
        }
    } else {
        const { error } = await supabase.from('listing_claims').update({ status }).eq('id', claim.id);
         if (error) toast.error("Failed");
         else {
            toast.success("Claim rejected");
            setClaims(claims.filter(c => c.id !== claim.id));
         }
    }
  };

  if (!user) return <div className="p-10 text-center">Please log in to access admin panel.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs defaultValue="ugc">
          <TabsList>
            <TabsTrigger value="ugc">Pending Photos ({photos.length})</TabsTrigger>
            <TabsTrigger value="claims">Pending Claims ({claims.length})</TabsTrigger>
            <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
          </TabsList>

          {/* UGC TAB */}
          <TabsContent value="ugc" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {photos.map(photo => (
                    <div key={photo.id} className="bg-white p-4 rounded-xl shadow-sm border space-y-3">
                        <img src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/ugc-sunsets/${photo.image_path}`} className="w-full h-48 object-cover rounded-md" />
                        <p className="text-sm italic">"{photo.caption}"</p>
                        <div className="flex gap-2">
                            <Button size="sm" onClick={() => handlePhotoAction(photo.id, 'approved')} className="bg-green-600 hover:bg-green-700 w-full">Approve</Button>
                            <Button size="sm" variant="destructive" onClick={() => handlePhotoAction(photo.id, 'rejected')} className="w-full">Reject</Button>
                        </div>
                    </div>
                ))}
                {photos.length === 0 && <p className="text-gray-500">No pending photos.</p>}
            </div>
          </TabsContent>

          {/* CLAIMS TAB */}
          <TabsContent value="claims" className="mt-6">
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-100 rounded-lg flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-yellow-900">Payment Link</h3>
                    <p className="text-sm text-yellow-700">Send this to approved partners for verification payments.</p>
                </div>
                <div className="flex gap-2">
                    <code className="bg-white px-2 py-1 rounded border text-sm">{import.meta.env.VITE_STRIPE_VERIFIED_LINK || "Set VITE_STRIPE_VERIFIED_LINK"}</code>
                    <Button size="sm" variant="outline" onClick={() => {
                        navigator.clipboard.writeText(import.meta.env.VITE_STRIPE_VERIFIED_LINK || "");
                        toast.success("Link copied");
                    }}>Copy</Button>
                </div>
            </div>

            <Table className="bg-white rounded-xl shadow-sm overflow-hidden">
                <TableHeader>
                    <TableRow>
                        <TableHead>Listing</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Proof</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {claims.map(claim => (
                        <TableRow key={claim.id}>
                            <TableCell className="font-medium">{claim.listings?.name}</TableCell>
                            <TableCell>
                                <div>{claim.name}</div>
                                <div className="text-xs text-gray-400">{claim.email}</div>
                            </TableCell>
                            <TableCell className="max-w-xs truncate" title={claim.proof_text}>{claim.proof_text}</TableCell>
                            <TableCell className="flex gap-2">
                                <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50" onClick={() => handleClaimAction(claim, 'approved')}>Approve</Button>
                                <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleClaimAction(claim, 'rejected')}>Reject</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {claims.length === 0 && <TableRow><TableCell colSpan={4} className="text-center">No pending claims.</TableCell></TableRow>}
                </TableBody>
            </Table>
          </TabsContent>

          {/* BOOKINGS TAB */}
          <TabsContent value="bookings" className="mt-6">
             <Table className="bg-white rounded-xl shadow-sm overflow-hidden">
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Request</TableHead>
                        <TableHead>Attribution</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings.map(booking => (
                        <TableRow key={booking.id}>
                            <TableCell>{new Date(booking.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <div>{booking.name}</div>
                                <div className="text-xs text-gray-400">{booking.contact_email}</div>
                            </TableCell>
                            <TableCell className="max-w-xs">{booking.message}</TableCell>
                            <TableCell className="text-xs font-mono">{booking.source_path}</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {booking.status}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
