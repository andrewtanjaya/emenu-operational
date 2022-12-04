import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./RestaurantSetting.css";
import {
  Form,
  Input,
  Button,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  Col,
  Row,
  Modal,
  Image,
  message,
  Spin,
} from "antd";
import { RestaurantController } from "../../../Controller/RestaurantController";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "../../../Model/Restaurant";
import { RestaurantAddress } from "../../../Model/RestaurantAddress";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import {
  restauranBannerRef,
  restauranLogoRef,
  restaurantQrisRef,
} from "../../../Config/Firebase";
import { v4 as uuid } from "uuid";
const { TextArea } = Input;

function RestaurantSetting() {
  const [logoPreview, setLogoPreview] = useState();
  const [qrisPreview, setQrisPreview] = useState();
  const [logoImage, setLogoImage] = useState();
  const [qrisImage, setQrisImage] = useState();
  const [bannersImage, setBannersImage] = useState([]);
  const [restaurantData, setRestaurantData] = useState(null);
  const [isLoad, setIsLoad] = useState(true);
  const [isUpload, setIsUpload] = useState(false);
  const [bannersPreview, setBannersPreview] = useState();
  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const navigate = useNavigate();
  // const [value, loading, error, snapshot] =
  // useDocumentData(RestaurantController.getRestaurantById())
  const onRemoveBanner = (file) => {
    const index = bannersImage.indexOf(file);
    const newbannersImage = bannersImage.slice();
    newbannersImage.splice(index, 1);
    setBannersImage(newbannersImage);
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

  useEffect(() => {
    RestaurantController.getRestaurantById(userSession.restaurantId).then(
      (result) => {
        if (!result) {
          navigate("not found page");
        }
        setRestaurantData(result);
        setIsLoad(false);
        let bannerImgUrl = result.restaurantBanners.map((x) => {
          return { uid: uuid(), status: "done", url: x };
        });
        setBannersPreview(bannerImgUrl);
      }
    );
  }, []);

  const onFinish = async (values) => {
    setIsUpload(true);
    let bannersUrl = restaurantData.restaurantBanners;
    let qrisUrl = restaurantData.restaurantQris;
    let logoUrl = restaurantData.restaurantLogoPicture;
    if (logoImage) {
      await uploadBytes(
        restauranLogoRef(`${logoImage.name + uuid()}`),
        logoImage
      ).then(async (response) => {
        await getDownloadURL(response.ref).then((url) => {
          logoUrl = url;
        });
      });
    }
    if (qrisImage) {
      await uploadBytes(
        restaurantQrisRef(`${qrisImage.name + uuid()}`),
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
          restauranBannerRef(`${bannersImage[i].name + uuid()}`),
          bannersImage[i]
        ).then(async (response) => {
          await getDownloadURL(response.ref).then((url) => {
            bannersUrl = [...bannersUrl, url];
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
      successModal("Success", "Data has been saved");
      setLogoImage(null);
      setQrisImage(null);
      setIsUpload(false);
    });
  };

  function successModal(title, content) {
    Modal.success({
      title: title,
      content: content,
    });
  }

  function errorModal(title, content) {
    Modal.error({
      title: title,
      content: content,
    });
  }
  return (
    <>
      {!isLoad && (
        <div className="setting-layout-container">
          <div className="header">
            <h1>Restaurant Setting</h1>
          </div>
          <div className="setting-form-container">
            {isUpload ? (
              <Spin tip="Loading">
                <div className="content" />
              </Spin>
            ) : (
              <Form
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
                      >
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
                          fallback="https://static.vecteezy.com/system/resources/previews/004/968/473/original/upload-or-add-a-picture-jpg-file-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg"
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
                          fallback="https://static.vecteezy.com/system/resources/previews/004/968/473/original/upload-or-add-a-picture-jpg-file-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg"
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

                    <Form.Item
                      label="Phone Number"
                      name="restaurantPhoneNumber"
                    >
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
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default () => <RestaurantSetting />;
