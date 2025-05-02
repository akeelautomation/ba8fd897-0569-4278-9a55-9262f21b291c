
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, ChevronDown } from "lucide-react";

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_wilaya: string;
  customer_address: string;
  total_price: number;
  status: string;
  created_at: string;
}

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_title: string;
  product_price: number;
  quantity: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ar-DZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
};

const formatPrice = (price: number) => {
  return `${price.toLocaleString()} دج`;
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast({
          title: "خطأ في جلب الطلبات",
          description: "حدث خطأ أثناء محاولة جلب الطلبات",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  // Fetch order items for an order
  const fetchOrderItems = async (orderId: string) => {
    try {
      setLoadingItems(true);
      const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);
      
      if (error) throw error;
      setOrderItems(data || []);
    } catch (error) {
      console.error('Error fetching order items:', error);
      toast({
        title: "خطأ في جلب تفاصيل الطلب",
        description: "حدث خطأ أثناء محاولة جلب تفاصيل الطلب",
        variant: "destructive",
      });
    } finally {
      setLoadingItems(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);
      
      if (error) throw error;
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status } : order
      ));
      
      toast({
        title: "تم تحديث حالة الطلب",
        description: "تم تحديث حالة الطلب بنجاح",
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "خطأ في تحديث حالة الطلب",
        description: "حدث خطأ أثناء محاولة تحديث حالة الطلب",
        variant: "destructive",
      });
    }
  };

  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
      fetchOrderItems(orderId);
    }
  };

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    fetchOrderItems(order.id);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">لوحة التحكم</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">الطلبات</h2>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">لا توجد طلبات حتى الآن</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>رقم الطلب</TableHead>
                  <TableHead>العميل</TableHead>
                  <TableHead>رقم الهاتف</TableHead>
                  <TableHead>الولاية</TableHead>
                  <TableHead>المجموع</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead className="text-left">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <TableRow className="hover:bg-muted/50">
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleOrderDetails(order.id)}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              expandedOrder === order.id ? "transform rotate-180" : ""
                            }`}
                          />
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.id.substring(0, 8)}
                      </TableCell>
                      <TableCell>{order.customer_name}</TableCell>
                      <TableCell>{order.customer_phone}</TableCell>
                      <TableCell>{order.customer_wilaya}</TableCell>
                      <TableCell>{formatPrice(order.total_price)}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            statusColors[order.status] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status === "pending" && "قيد الانتظار"}
                          {order.status === "processing" && "قيد المعالجة"}
                          {order.status === "shipped" && "تم الشحن"}
                          {order.status === "delivered" && "تم التسليم"}
                          {order.status === "cancelled" && "ملغي"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(order.created_at)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2 space-x-reverse">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                onClick={() => handleViewOrderDetails(order)}
                              >
                                عرض التفاصيل
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>تفاصيل الطلب</DialogTitle>
                              </DialogHeader>
                              
                              {selectedOrder && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h3 className="font-semibold mb-2">معلومات العميل</h3>
                                      <p><span className="font-medium">الاسم:</span> {selectedOrder.customer_name}</p>
                                      <p><span className="font-medium">رقم الهاتف:</span> {selectedOrder.customer_phone}</p>
                                    </div>
                                    
                                    <div>
                                      <h3 className="font-semibold mb-2">عنوان التوصيل</h3>
                                      <p><span className="font-medium">الولاية:</span> {selectedOrder.customer_wilaya}</p>
                                      <p><span className="font-medium">العنوان:</span> {selectedOrder.customer_address}</p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h3 className="font-semibold mb-2">المنتجات</h3>
                                    {loadingItems ? (
                                      <div className="flex justify-center py-4">
                                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                      </div>
                                    ) : (
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead>المنتج</TableHead>
                                            <TableHead>السعر</TableHead>
                                            <TableHead>الكمية</TableHead>
                                            <TableHead>المجموع</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {orderItems.map((item) => (
                                            <TableRow key={item.id}>
                                              <TableCell>{item.product_title}</TableCell>
                                              <TableCell>{formatPrice(item.product_price)}</TableCell>
                                              <TableCell>{item.quantity}</TableCell>
                                              <TableCell>{formatPrice(item.product_price * item.quantity)}</TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    )}
                                  </div>
                                  
                                  <div className="border-t pt-4">
                                    <div className="flex justify-between font-bold">
                                      <span>المجموع الكلي</span>
                                      <span>{formatPrice(selectedOrder.total_price)}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="border-t pt-4">
                                    <h3 className="font-semibold mb-2">تغيير حالة الطلب</h3>
                                    <div className="flex flex-wrap gap-2">
                                      <Button 
                                        variant={selectedOrder.status === "pending" ? "default" : "outline"}
                                        size="sm" 
                                        onClick={() => updateOrderStatus(selectedOrder.id, "pending")}
                                      >
                                        قيد الانتظار
                                      </Button>
                                      <Button 
                                        variant={selectedOrder.status === "processing" ? "default" : "outline"}
                                        size="sm" 
                                        onClick={() => updateOrderStatus(selectedOrder.id, "processing")}
                                      >
                                        قيد المعالجة
                                      </Button>
                                      <Button 
                                        variant={selectedOrder.status === "shipped" ? "default" : "outline"}
                                        size="sm" 
                                        onClick={() => updateOrderStatus(selectedOrder.id, "shipped")}
                                      >
                                        تم الشحن
                                      </Button>
                                      <Button 
                                        variant={selectedOrder.status === "delivered" ? "default" : "outline"}
                                        size="sm" 
                                        onClick={() => updateOrderStatus(selectedOrder.id, "delivered")}
                                      >
                                        تم التسليم
                                      </Button>
                                      <Button 
                                        variant={selectedOrder.status === "cancelled" ? "default" : "outline"}
                                        size="sm" 
                                        className="bg-red-500 hover:bg-red-600 text-white"
                                        onClick={() => updateOrderStatus(selectedOrder.id, "cancelled")}
                                      >
                                        إلغاء
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    {/* Expanded row for order items */}
                    {expandedOrder === order.id && (
                      <TableRow>
                        <TableCell colSpan={9} className="p-0">
                          <div className="p-4 bg-muted/30">
                            <h4 className="font-medium mb-2">المنتجات في الطلب</h4>
                            {loadingItems ? (
                              <div className="flex justify-center py-4">
                                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                              </div>
                            ) : (
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>المنتج</TableHead>
                                    <TableHead>السعر</TableHead>
                                    <TableHead>الكمية</TableHead>
                                    <TableHead>المجموع</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {orderItems.map((item) => (
                                    <TableRow key={item.id}>
                                      <TableCell>{item.product_title}</TableCell>
                                      <TableCell>{formatPrice(item.product_price)}</TableCell>
                                      <TableCell>{item.quantity}</TableCell>
                                      <TableCell>{formatPrice(item.product_price * item.quantity)}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
