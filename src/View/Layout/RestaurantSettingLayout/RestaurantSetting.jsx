import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./RestaurantSetting.css";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Upload,
  Col,
  Row,
  Modal,
  Image,
  message,
} from "antd";
import { RestaurantController } from "../../../Controller/RestaurantController";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "../../../Model/Restaurant";
import { RestaurantAddress } from "../../../Model/RestaurantAddress";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import {
  restauranBannerRef,
  restauranLogoRef,
  restaurantBannerRef,
  restaurantQrisRef,
} from "../../../Config/Firebase";
import { v4 as uuid } from "uuid";
const { TextArea } = Input;
const defaultImage =
  "https://static.vecteezy.com/system/resources/previews/004/968/473/original/upload-or-add-a-picture-jpg-file-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg";
function RestaurantSetting() {
  const [logoPreview, setLogoPreview] = useState(null);
  const [qrisPreview, setQrisPreview] = useState(null);
  const [bannersPreview, setBannersPreview] = useState([]);
  const [logoImage, setLogoImage] = useState();
  const [qrisImage, setQrisImage] = useState();
  const [bannersImage, setBannersImage] = useState([]);
  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const [restaurantData, setRestaurantData] = useState(null);
  const [isLoad, setIsLoad] = useState(true);
  const [isUpload, setIsUpload] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    RestaurantController.getRestaurantById(userSession.restaurantId).then(
      (result) => {
        if (!result) {
          navigate("not found page");
        }
        setRestaurantData(result);
        let bannerImgUrl = result.restaurantBanners.map((x) => {
          return { uid: uuid(), status: "done", thumbUrl: x, url: x };
        });
        setBannersPreview(bannerImgUrl);
        setIsLoad(false);
      }
    );
  }, []);

  const onRemoveBanner = (file) => {
    const indexImage = bannersImage
      .map(function (e) {
        return e.uid;
      })
      .indexOf(file.uid);

    const indexPreview = bannersPreview.indexOf(file);

    if (bannersImage.length > 0 && indexImage !== -1) {
      const newbannersImage = bannersImage.slice();
      newbannersImage.splice(indexImage, 1);
      setBannersImage(newbannersImage);
    }
    if (bannersPreview.length > 0 && indexPreview !== -1) {
      const newbannersPreview = bannersPreview.slice();
      newbannersPreview.splice(indexPreview, 1);
      setBannersPreview(newbannersPreview);
    }
  };

  const beforeUploadBanners = (file) => {
    const isPng = file.type === "image/png";
    if (!isPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    setBannersImage([...bannersImage, file]);
    return false;
  };

  const beforeUploadLogo = (file) => {
    const isPng = file.type === "image/png";
    if (!isPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    setLogoPreview(URL.createObjectURL(file));
    setLogoImage(file);
    return false;
  };

  const beforeUploadQris = (file) => {
    const isPng = file.type === "image/png";
    setQrisImage(file);
    if (!isPng) {
      message.error("You can only upload JPG/PNG file!");
    }

    setQrisPreview(URL.createObjectURL(file));
    setQrisImage(file);
    return false;
  };

  const onFinish = async (values) => {
    setIsUpload(true);
    setOpenSuccessModal(true);
    let bannersUrl = bannersPreview.map((img) => {
      return img.url;
    });
    let qrisUrl = restaurantData.restaurantQris;
    let logoUrl = restaurantData.restaurantLogoPicture;
    if (logoImage) {
      await uploadBytes(
        restauranLogoRef(`${uuid() + logoImage.name}`),
        logoImage
      ).then(async (response) => {
        await getDownloadURL(response.ref).then((url) => {
          logoUrl = url;
        });
      });
    }
    if (qrisImage) {
      await uploadBytes(
        restaurantQrisRef(`${uuid() + qrisImage.name}`),
        qrisImage
      ).then(async (response) => {
        await getDownloadURL(response.ref).then((url) => {
          qrisUrl = url;
        });
      });
    }
    if (bannersImage) {
      for (let i = 0; i < bannersImage.length; i++) {
        await uploadBytes(
          restaurantBannerRef(`${uuid() + bannersImage[i].name}`),
          bannersImage[i]
        ).then(async (response) => {
          await getDownloadURL(response.ref).then((url) => {
            bannersUrl = [...bannersUrl, url];
            bannersPreview.push({
              uid: uuid(),
              status: "done",
              thumbUrl: url,
              url: url,
            });
          });
        });
      }
    }
    const videoUrlsString = values.videoUrls.toString();
    let restaurantAddress = new RestaurantAddress(
      values.street,
      values.district,
      values.city,
      values.province,
      values.country,
      values.postalCode
    );
    let restaurant = new Restaurant(
      restaurantData.restaurantId,
      values.restaurantName,
      values.restaurantPhoneNumber,
      logoUrl ? logoUrl : restaurantData.restaurantLogoPicture,
      qrisUrl ? qrisUrl : restaurantData.restaurantQris,
      values.tax,
      values.serviceCharge,
      Object.assign({}, restaurantAddress),
      bannersUrl,
      videoUrlsString.split(";")
    );
    RestaurantController.updateRestaurant(restaurant).then(() => {
      setLogoImage(null);
      setQrisImage(null);
      setBannersImage([]);
      setIsUpload(false);
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  function closeSuccessModal() {
    setOpenSuccessModal(false);
  }

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    setPreviewImage(file.thumbUrl);
    setPreviewOpen(true);
  };

  return (
    <>
      {!isLoad && (
        <div className="setting-layout-container">
          <div className="header">
            <h1>Restaurant Setting</h1>
          </div>
          <div className="setting-form-container">
            <Form
              form={form}
              onFinish={onFinish}
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                restaurantName: restaurantData.restaurantName,
                serviceCharge: restaurantData.serviceCharge,
                tax: restaurantData.tax,
                street: restaurantData.restaurantAddress.street,
                district: restaurantData.restaurantAddress.district,
                city: restaurantData.restaurantAddress.city,
                province: restaurantData.restaurantAddress.province,
                country: restaurantData.restaurantAddress.country,
                postalCode: restaurantData.restaurantAddress.postalCode,
                restaurantPhoneNumber: restaurantData.restaurantPhoneNumber,
                videoUrls: restaurantData.videoUrl.join(";"),
              }}
            >
              <Row gutter={16} justify="space-evenly">
                <Col span={12}>
                  <Form.Item label="Restaurant Name" name="restaurantName">
                    <Input placeholder="restaurant name" />
                  </Form.Item>
                  <Form.Item
                    label="Restaurant Banners"
                    name="restaurantBanners"
                  >
                    <Upload
                      beforeUpload={beforeUploadBanners}
                      onRemove={onRemoveBanner}
                      listType="picture-card"
                      maxCount={5}
                      defaultFileList={bannersPreview}
                      onPreview={handlePreview}
                    >
                      {bannersPreview.length + bannersImage.length >= 4
                        ? null
                        : uploadButton}
                    </Upload>
                  </Form.Item>
                  <Form.Item
                    label="Video Link(s) seperate each link with comma(;)"
                    name="videoUrls"
                  >
                    <TextArea
                      rows={6}
                      placeholder="videoUrl1;videourl2;videourl3"
                    />
                  </Form.Item>
                  <Row gutter={[16, 40]} justify="start">
                    <Col span={8}>
                      <Image
                        width={100}
                        height={100}
                        src={
                          logoPreview
                            ? logoPreview
                            : restaurantData.restaurantLogoPicture
                        }
                        fallback={defaultImage}
                      />
                    </Col>
                    <Col span={16}>
                      <Form.Item label="Restaurant Logo">
                        <Upload
                          listType="text"
                          beforeUpload={beforeUploadLogo}
                          maxCount={1}
                          showUploadList={false}
                        >
                          <Button type="primary" ghost>
                            Change Logo
                          </Button>
                        </Upload>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Image
                        width={100}
                        height={100}
                        src={
                          qrisPreview
                            ? qrisPreview
                            : restaurantData.restaurantQris
                        }
                        fallback={defaultImage}
                      />
                    </Col>
                    <Col span={16}>
                      <Form.Item label="Restaurant QRIS">
                        <Upload
                          listType="text"
                          beforeUpload={beforeUploadQris}
                          maxCount={1}
                          showUploadList={false}
                        >
                          <Button type="primary" ghost>
                            Change QRIS
                          </Button>
                        </Upload>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row gutter={16} justify="start">
                    <Col span={12}>
                      <Form.Item
                        label="Service Charge (%)"
                        name="serviceCharge"
                      >
                        <InputNumber />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Tax (%)" name="tax">
                        <InputNumber />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item label="Phone Number" name="restaurantPhoneNumber">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Street" name="street">
                    <TextArea rows={3} />
                  </Form.Item>
                  <Form.Item label="District" name="district">
                    <Input />
                  </Form.Item>
                  <Form.Item label="City" name="city">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Province" name="province">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Country" name="country">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Postal Code" name="postalCode">
                    <Input />
                  </Form.Item>
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Button id="saveButton" type="primary" htmlType="submit">
                      Save
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          <Modal
            centered
            open={previewOpen}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
          <Modal
            centered
            open={openSuccessModal}
            onCancel={closeSuccessModal}
            title="Success"
            footer={[
              <Button
                id="saveButton"
                // key="submit"
                type="primary"
                loading={isUpload}
                onClick={() => {
                  setOpenSuccessModal(false);
                  navigate("/admin");
                }}
              >
                Ok
              </Button>,
            ]}
          ></Modal>
        </div>
      )}
    </>
  );
}
export default () => <RestaurantSetting />;
