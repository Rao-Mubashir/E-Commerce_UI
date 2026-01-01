import { useState } from 'react';
import { useStore } from '../../store';
import { Plus, Edit2, Trash2, Save, X, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Offer } from '../../types';

export function ManageOffers() {
  const { offers, addOffer, updateOffer, deleteOffer } = useStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<Offer>({
    id: '',
    title: '',
    description: '',
    detailPageDescription: '',
    image: '',
    discount: 0,
    originalPrice: 0,
    active: true
  });

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      detailPageDescription: '',
      image: '',
      discount: 0,
      originalPrice: 0,
      active: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (offer: Offer) => {
    setFormData(offer);
    setEditingId(offer.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingId) {
      updateOffer(editingId, formData);
    } else {
      addOffer({ ...formData, id: `offer-${Date.now()}` });
    }

    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this offer?')) {
      deleteOffer(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Manage Offers</h1>
              <p className="text-gray-600">Add and edit promotional offers</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Offer</span>
            </button>
          </div>

          {/* Form Modal */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={resetForm}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                      {editingId ? 'Edit Offer' : 'Add New Offer'}
                    </h2>
                    <button
                      onClick={resetForm}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Offer Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="e.g., 50% OFF Weekend Sale"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        rows={3}
                        placeholder="Describe the offer..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Detail Page Description (Long Text)
                      </label>
                      <textarea
                        value={formData.detailPageDescription || ''}
                        onChange={(e) => setFormData({ ...formData, detailPageDescription: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        rows={6}
                        placeholder="Detailed description for the offer page..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="https://example.com/image.jpg"
                      />
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="mt-2 w-full h-40 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Invalid+Image';
                          }}
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount Percentage
                      </label>
                      <input
                        type="number"
                        value={formData.discount || 0}
                        onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) || 0 })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        min="0"
                        max="100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Original Price *
                      </label>
                      <input
                        type="number"
                        value={formData.originalPrice || 0}
                        onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) || 0 })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        min="0"
                        step="0.01"
                        placeholder="19.99"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="active"
                        checked={formData.active}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <label htmlFor="active" className="text-sm font-medium text-gray-700">
                        Active (visible to customers)
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleSubmit}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors"
                    >
                      <Save className="w-5 h-5" />
                      <span>{editingId ? 'Update' : 'Save'} Offer</span>
                    </button>
                    <button
                      onClick={resetForm}
                      className="px-4 py-3 border border-gray-300 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Offers List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              >
                <div className="relative h-40">
                  {offer.image ? (
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x200?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                      <Tag className="w-16 h-16 text-white/50" />
                    </div>
                  )}
                  {offer.discount > 0 && (
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {offer.discount}% OFF
                    </div>
                  )}
                  {!offer.active && (
                    <div className="absolute top-3 left-3 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Inactive
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">{offer.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{offer.description}</p>

                  {/* Pricing Information */}
                  {offer.originalPrice > 0 && (
                    <div className="mb-4 pb-4 border-b border-gray-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Original Price:</span>
                        <span className="text-gray-700 font-medium">${offer.originalPrice.toFixed(2)}</span>
                      </div>
                      {offer.discount > 0 && (
                        <>
                          <div className="flex items-center justify-between text-sm mt-1">
                            <span className="text-gray-500">Discount:</span>
                            <span className="text-emerald-600 font-medium">{offer.discount}%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm mt-1">
                            <span className="text-gray-700 font-semibold">Final Price:</span>
                            <span className="text-green-600 font-bold">
                              ${(offer.originalPrice * (1 - offer.discount / 100)).toFixed(2)}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(offer)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(offer.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {offers.length === 0 && (
              <div className="col-span-2 text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100">
                <Tag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No offers yet. Create your first offer!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}