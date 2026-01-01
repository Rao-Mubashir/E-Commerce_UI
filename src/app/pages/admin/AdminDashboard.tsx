import { Package, Tag, ShoppingBag, TrendingUp, Lock, LogOut, Check, AlertCircle, X } from 'lucide-react';
import { useStore } from '../../store';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { menuItems, offers, orders, adminLogout } = useStore();

  const stats = [
    {
      title: 'Total Orders',
      value: orders.length,
      icon: ShoppingBag,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Menu Items',
      value: menuItems.length,
      icon: Package,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      title: 'Active Offers',
      value: offers.filter(o => o.active).length,
      icon: Tag,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600'
    },
    {
      title: 'Total Revenue',
      value: `$${orders.reduce((sum, o) => sum + o.totalAmount, 0).toFixed(2)}`,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Offers',
      description: 'Add, edit, or remove promotional offers',
      icon: Tag,
      color: 'from-teal-500 to-teal-600',
      onClick: () => onNavigate('admin-offers')
    },
    {
      title: 'Manage Menu Items',
      description: 'Add or update menu items',
      icon: Package,
      color: 'from-emerald-500 to-emerald-600',
      onClick: () => onNavigate('admin-menu')
    },
    {
      title: 'Order Tracking',
      description: 'View and manage customer orders',
      icon: ShoppingBag,
      color: 'from-blue-500 to-blue-600',
      onClick: () => onNavigate('admin-orders')
    }
  ];

  // Password Update State
  // Access customerInfo/etc to get admin user if stored, but we store 'isAdmin' bool. 
  // We need the username to update password. Actually, the store only saves 'isAdmin=true'. 
  // We should assume 'admin' as username or store it. 
  // For now, hardcode 'admin' as the username since we only have one admin in DB.

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleUpdatePassword = async () => {
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/admin/update-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', newPassword }),
      });

      if (res.ok) {
        setPasswordSuccess('Password updated successfully');
        setTimeout(() => {
          setShowPasswordModal(false);
          setPasswordSuccess('');
          setNewPassword('');
          setConfirmPassword('');
        }, 1500);
      } else {
        const data = await res.json();
        setPasswordError(data.error || 'Failed to update password');
      }
    } catch (err) {
      setPasswordError('Failed to connect to server');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your e-commerce platform</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 flex items-center gap-2 transition-colors font-medium shadow-sm"
              >
                <Lock className="w-4 h-4" />
                Change Password
              </button>
              <button
                onClick={() => {
                  adminLogout();
                  onNavigate('home');
                }}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 flex items-center gap-2 transition-colors font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    onClick={action.onClick}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all text-left group"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{action.title}</h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm font-mono font-semibold">{order.id}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm font-medium">{order.customerName}</p>
                            <p className="text-sm text-gray-500">{order.email}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm font-semibold">${order.totalAmount.toFixed(2)}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${order.orderStatus === 'Completed'
                              ? 'bg-green-100 text-green-700'
                              : order.orderStatus === 'Processing'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-yellow-100 text-yellow-700'
                              }`}>
                              {order.orderStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No orders yet</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Change Password</h2>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {passwordError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-sm flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  {passwordSuccess}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  onClick={handleUpdatePassword}
                  className="w-full bg-emerald-600 text-white py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-colors mt-2"
                >
                  Update Password
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
