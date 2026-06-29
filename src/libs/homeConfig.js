export const homeConfig = {
  livingRoom: {
    name: "Phòng Khách",
    floor: 1,
    center: [-3.5, 0, 0],
    size: [5, 3, 6],
    cameraFocus: { position: [-3.5, 2.8, 7.5], target: [-3.5, 1.2, 0] },
    lights: [
      { id: 'lr_l1', name: 'Đèn Trần', on: true, brightness: 80, color: '#FFC857' },
      { id: 'lr_l2', name: 'Đèn Bàn', on: false, brightness: 60, color: '#FFA94D' },
    ],
    ac: { on: true, temperature: 24, mode: 'cool', currentTemp: 25 },
    camera: { id: 'cam_lr', name: 'Camera Phòng Khách', online: true, angle: 45 },
    furniture: [
      { type: 'sofa', position: [0, 0, 2.2] },
      { type: 'tv', position: [0, 0, -2.8] },
      { type: 'coffeeTable', position: [0, 0, 0.5] },
    ],
  },
  kitchen: {
    name: "Phòng Bếp",
    floor: 1,
    center: [1, 0, 0],
    size: [4, 3, 6],
    cameraFocus: { position: [1, 2.8, 7.5], target: [1, 1.2, 0] },
    lights: [
      { id: 'k_l1', name: 'Đèn Bếp', on: true, brightness: 90, color: '#E8F0FF' },
    ],
    ac: { on: false, temperature: 25, mode: 'cool', currentTemp: 28 },
    camera: { id: 'cam_k', name: 'Camera Phòng Bếp', online: true, angle: 90 },
    furniture: [
      { type: 'counter', position: [0, 0, -2.5] },
      { type: 'island', position: [0, 0, 0.5] },
    ],
  },
  garage: {
    name: "Nhà Để Xe",
    floor: 1,
    center: [4.5, 0, 0],
    size: [3, 3, 6],
    cameraFocus: { position: [4.5, 2.8, 7.5], target: [4.5, 1.2, 0] },
    lights: [
      { id: 'g_l1', name: 'Đèn Garage', on: false, brightness: 70, color: '#E8F0FF' },
    ],
    ac: null,
    camera: { id: 'cam_g', name: 'Camera Garage', online: true, angle: 180 },
    furniture: [
      { type: 'car', position: [0, 0, 0.5] },
    ],
  },
  bedroom: {
    name: "Phòng Ngủ",
    floor: 2,
    center: [-3, 3, 0],
    size: [6, 3, 6],
    cameraFocus: { position: [-3, 5.8, 7.5], target: [-3, 4.2, 0] },
    lights: [
      { id: 'bd_l1', name: 'Đèn Trần', on: false, brightness: 50, color: '#FFC857' },
      { id: 'bd_l2', name: 'Đèn Đầu Giường', on: true, brightness: 30, color: '#FF8A65' },
    ],
    ac: { on: true, temperature: 22, mode: 'cool', currentTemp: 23 },
    camera: { id: 'cam_bd', name: 'Camera Phòng Ngủ', online: false, angle: 270 },
    furniture: [
      { type: 'bed', position: [0, 0, 0] },
      { type: 'nightstand', position: [-2, 0, -1.5] },
    ],
  },
  bathroom: {
    name: "Phòng Tắm",
    floor: 2,
    center: [3, 3, 0],
    size: [6, 3, 6],
    cameraFocus: { position: [3, 5.8, 7.5], target: [3, 4.2, 0] },
    lights: [
      { id: 'bt_l1', name: 'Đèn Phòng Tắm', on: false, brightness: 80, color: '#E8F0FF' },
    ],
    ac: { on: false, temperature: 25, mode: 'fan', currentTemp: 27 },
    camera: null,
    furniture: [
      { type: 'toilet', position: [2, 0, -2] },
      { type: 'sink', position: [-2, 0, -2.5] },
    ],
  },
};

export const roomOrder = ['livingRoom', 'kitchen', 'garage', 'bedroom', 'bathroom'];