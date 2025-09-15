import React from 'react'
import MainLayout from '../../../components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'

const HousingListPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        {/* Search Section */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Tìm kiếm nhà trọ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input placeholder="Địa điểm..." />
                <Input placeholder="Giá từ..." type="number" />
                <Input placeholder="Giá đến..." type="number" />
                <Button className="w-full">Tìm kiếm</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Bộ lọc</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Khu vực</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Quận 1
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Quận 2
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Quận 3
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Loại nhà</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Phòng trọ
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Chung cư mini
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Nhà nguyên căn
                    </label>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Đặt lại bộ lọc
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Housing List */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Kết quả tìm kiếm</h2>
              <select className="border rounded-md px-3 py-2">
                <option>Mới nhất</option>
                <option>Giá thấp đến cao</option>
                <option>Giá cao đến thấp</option>
                <option>Diện tích</option>
              </select>
            </div>

            {/* Placeholder for housing items */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <Card key={item} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Hình ảnh</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                          Phòng trọ cao cấp gần trường Đại học
                        </h3>
                        <p className="text-gray-600 mb-2">
                          📍 123 Đường ABC, Quận 1, TP.HCM
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span>🏠 25m²</span>
                          <span>🚿 Có WC riêng</span>
                          <span>❄️ Có điều hòa</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-blue-600">
                            3.500.000 VNĐ/tháng
                          </span>
                          <Button size="sm">Xem chi tiết</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Trước
                </Button>
                <Button size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">
                  Sau
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default HousingListPage
