import { useState, useEffect } from "react";
import InputText from "../Input/InputText";
import InputEmail from "../Input/InputEmail";
import { FaPenToSquare } from "react-icons/fa6";
import { fetchProfileData, updateProfile } from "../../utils/Api";
import { format, parseISO } from "date-fns";

const Profile = () => {
  const initialValues = {
    nama: "",
    email: "",
    nomorTelepon: "",
    tanggalLahir: "",
    alamat: "",
    photo: "/images/profile.png",
  };

  const [nama, setNama] = useState(initialValues.nama);
  const [email, setEmail] = useState(initialValues.email);
  const [nomorTelepon, setNomorTelepon] = useState(initialValues.nomorTelepon);
  const [alamat, setAlamat] = useState(initialValues.alamat);
  const [tanggalLahir, setTanggalLahir] = useState(initialValues.tanggalLahir);
  const [profilePhoto, setProfilePhoto] = useState(initialValues.photo);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    nama: "",
    email: "",
    nomorTelepon: "",
    tanggalLahir: "",
    alamat: "",
  });
  const [originalData, setOriginalData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({
    title: "",
    message: "",
  });

  const closeAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchProfileData();
        if (userData) {
          const { name, email, phone, address, date_of_birth, photo } =
            userData;
          const formattedDate = date_of_birth
            ? format(parseISO(date_of_birth), "yyyy-MM-dd")
            : "";

          setNama(name || "");
          setEmail(email || "");
          setNomorTelepon(phone || "");
          setAlamat(address || "");
          setTanggalLahir(formattedDate);
          setProfilePhoto(
            photo
              ? `http://localhost:3000/${photo.replace(/\\/g, "/")}`
              : "/images/profile.png"
          );

          setOriginalData({
            name,
            email,
            phone,
            address,
            date_of_birth: formattedDate,
            photo: photo || "/images/profile.png",
          });
        }
      } catch (error) {
        console.error("Error fetching profile data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {
      nama: !nama ? "Nama tidak boleh kosong" : "",
      email: !email ? "Email tidak boleh kosong" : "",
      nomorTelepon: !nomorTelepon ? "Nomor Telepon tidak boleh kosong" : "",
      tanggalLahir: !tanggalLahir ? "Tanggal Lahir tidak boleh kosong" : "",
      alamat: !alamat ? "Alamat tidak boleh kosong" : "",
      photo:
        !profilePhoto || profilePhoto === initialValues.photo
          ? "Foto profil tidak boleh kosong"
          : "",
    };

    setErrorMessage(validationErrors);

    if (Object.values(validationErrors).some((error) => error)) {
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(tanggalLahir)) {
      setErrorMessage((prev) => ({
        ...prev,
        tanggalLahir:
          "Format tanggal lahir tidak valid. Gunakan format YYYY-MM-DD.",
      }));
      return;
    }

    setIsLoading(true);

    const dataToSend = new FormData();
    dataToSend.append("name", nama);
    dataToSend.append("email", email);
    dataToSend.append("phone", nomorTelepon);
    dataToSend.append("address", alamat);
    dataToSend.append("date_of_birth", tanggalLahir);

    const photoFile = profilePhoto && profilePhoto !== initialValues.photo;
    if (photoFile) {
      const photoBlob = await fetch(profilePhoto).then((res) => res.blob());
      dataToSend.append("photo", photoBlob, "profile-photo.png");
    }

    try {
      await updateProfile(dataToSend);
      setAlertContent({
        title: "Profil Diperbarui",
        message: "Profil Anda berhasil diperbarui.",
      });
      setShowAlert(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      setAlertContent({
        title: "Terjadi Kesalahan",
        message: "Gagal memperbarui profil. Coba lagi nanti.",
      });
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (originalData) {
      setNama(originalData.name || "");
      setEmail(originalData.email || "");
      setNomorTelepon(originalData.phone || "");
      setAlamat(originalData.address || "");
      setTanggalLahir(originalData.date_of_birth || "");
      setProfilePhoto(originalData.photo || "/images/profile.png");

      setAlertContent({
        title: "Perubahan Dibatalkan",
        message: "Semua perubahan telah dibatalkan.",
      });
      setShowAlert(true);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-md border border-gray-300"
      >
        <h5 className="text-xl font-semibold mb-6">Profil</h5>
        <hr className="border-t-1 border-black -mt-4 mb-5" />
        <div className="flex items-center justify-center md:justify-start lg:justify-start mb-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <label
              htmlFor="photoInput"
              className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer hover:bg-primary mb-4"
            >
              <FaPenToSquare size={20} />
            </label>
            <input
              type="file"
              id="photoInput"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            {errorMessage.photo && (
              <div className="text-red-600 text-sm mb-">
                {errorMessage.photo}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <InputText
              id="nama"
              type="text"
              label="Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              errorMessage={errorMessage.nama}
            />
            {errorMessage.nama && (
              <div className="text-red-600 text-sm">{errorMessage.nama}</div>
            )}
          </div>
          <div>
            <InputEmail
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errorMessage={errorMessage.email}
            />
            {errorMessage.email && (
              <div className="text-red-600 text-sm">{errorMessage.email}</div>
            )}
          </div>
          <div>
            <InputText
              id="nomorTelepon"
              type="text"
              label="Nomor Telepon"
              value={nomorTelepon}
              onChange={(e) => setNomorTelepon(e.target.value)}
              errorMessage={errorMessage.nomorTelepon}
            />
            {errorMessage.nomorTelepon && (
              <div className="text-red-600 text-sm">
                {errorMessage.nomorTelepon}
              </div>
            )}
          </div>
          <div>
            <InputText
              id="tanggalLahir"
              type="date"
              label="Tanggal Lahir"
              value={tanggalLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
              errorMessage={errorMessage.tanggalLahir}
            />
            {errorMessage.tanggalLahir && (
              <div className="text-red-600 text-sm">
                {errorMessage.tanggalLahir}
              </div>
            )}
          </div>
          <div className="col-span-1 lg:col-span-2">
            <InputText
              id="alamat"
              type="text"
              label="Alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              errorMessage={errorMessage.alamat}
            />
            {errorMessage.alamat && (
              <div className="text-red-600 text-sm">{errorMessage.alamat}</div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white hover:bg-primary"
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Simpan"}
          </button>
        </div>
      </form>
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-[90%] max-w-sm">
            <div className="mb-4 flex justify-center">
              {alertContent.title === "Profil Diperbarui" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                  />
                </svg>
              )}
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800 text-center">
              {alertContent.title}
            </h2>
            <p className="text-gray-700 text-sm text-center mb-4">
              {alertContent.message}
            </p>
            <div className="text-center">
              <button
                onClick={closeAlert}
                className="bg-primary text-white py-2 px-4 hover:bg-primary-dark"
              >
                Oke
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
