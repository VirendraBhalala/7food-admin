import React from "react";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import moment from "moment";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  invoiceHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItmes: "center",
    backgroundColor: "#0576b6",
    flexDirection: "row",
    padding: 15,
  },
  restaurant_logo: {
    height: 100,
    width: 20,
  },
  rating: {
    height: 100,
    width: 20,
  },
  invoiceName: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: 700,
    paddingBottom: 5,
  },
  invoiceEmail: {
    color: "#ffffff",
    fontSize: 10,
    paddingBottom: 5,
  },
  invoicePhone: {
    color: "#ffffff",
    fontSize: 10,
    paddingBottom: 5,
  },
  invoiceContent: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItmes: "center",
    padding: 15,
  },
  invoiceContentName: {
    color: "#000000",
    fontSize: 12,
    paddingBottom: 5,
  },
  invoiceContentAddress: {
    color: "#000000",
    fontSize: 10,
    paddingBottom: 5,
    maxWidth: "200px",
    lineHeight: 1.2,
    width: "100%",
  },
  invoiceNumber: {
    color: "#000000",
    fontSize: 12,
    fontWeight: 700,
    paddingBottom: 5,
  },
  invoiceContentNumber: {
    color: "#000000",
    fontSize: 10,
    paddingBottom: 10,
  },
  invoiceDate: {
    color: "#000000",
    fontSize: 12,
    fontWeight: 700,
    paddingBottom: 5,
  },
  invoiceContentDate: {
    color: "#000000",
    fontSize: 10,
  },
  invoicePart: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  invoiceTotal: {
    color: "#000000",
    fontSize: 12,
    fontWeight: 700,
    paddingBottom: 5,
  },
  invoiceContentTotal: {
    color: "#000000",
    fontSize: 10,
    paddingBottom: 10,
  },
  invoicePayment: {
    color: "#000000",
    fontSize: 12,
    fontWeight: 700,
    paddingBottom: 5,
  },
  invoiceContentPayment: {
    color: "#000000",
    fontSize: 10,
  },
  invoiceTable: {
    margin: 15,
    borderBottomStyle: "solid",
    boredrBottomWidth: 3,
    borderBottom: 1,
    borderBottomColor: "#f5f5f5",
  },
  invoicethead: {
    display: "flex",
    alignItmes: "center",
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
  },
  invoiceThead1: {
    maxWidth: "50px",
    width: "100%",
    fontSize: 10,
    fontWeight: 700,
    padding: 12,
    textAlign: "center",
    borderStyle: "solid",
    boredrWidth: 2,
    border: 1,
    borderColor: "#dddddd",
  },
  invoiceThead2: {
    maxWidth: "400px",
    width: "100%",
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    padding: 10,
    borderTopStyle: "solid",
    boredrTopWidth: 2,
    borderTop: 1,
    borderTopColor: "#dddddd",
    borderBottomStyle: "solid",
    boredrBottomWidth: 2,
    borderBottom: 1,
    borderBottomColor: "#dddddd",
  },
  invoiceThead3: {
    maxWidth: "115px",
    width: "100%",
    textAlign: "center",
    fontSize: 12,
    fontWeight: 700,
    padding: 10,
    borderStyle: "solid",
    boredrWidth: 2,
    border: 1,
    borderColor: "#dddddd",
  },
  invoicetbody: {
    display: "flex",
    alignItmes: "center",
    flexDirection: "row",
  },
  invoiceTbody1: {
    maxWidth: "50px",
    width: "100%",
    textAlign: "center",
    fontSize: 10,
    padding: 15,
    borderStyle: "solid",
    boredrWidth: 2,
    border: 1,
    borderColor: "#dddddd",
    borderTop: 0,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  invoiceTbody2: {
    fontSize: 10,
    display: "flex",
    paddingLeft: 15,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  invoiceTbody3: {
    maxWidth: "115px",
    width: "100%",
    textAlign: "right",
    fontSize: 10,
    padding: 15,
    borderStyle: "solid",
    boredrWidth: 2,
    border: 1,
    borderColor: "#dddddd",
    borderTop: 0,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  invoiceDeatil: {
    display: "flex",
    flexDirection: "row",
    alignItmes: "center",
    maxWidth: "400px",
    width: "100%",
    padding: 15,
    borderBottomStyle: "solid",
    boredrBottomWidth: 2,
    borderBottom: 1,
    borderBottomColor: "#dddddd",
    borderTop: 0,
  },
  invoiceTtext: {
    fontSize: 12,
    fontWeight: 700,
    paddingBottom: 5,
  },
  invoiceTsubtext: {
    fontSize: 10,
    paddingBottom: 5,
  },
  invoiceFooter: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    padding: 15,
  },
  invoiceFooterContent: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  invoiceFooterHead: {
    display: "flex",
    flexDirection: "row",
    alignItmes: "center",
    paddingBottom: 5,
  },
  invoiceFooterSubtotal: {
    minWidth: "130px",
    fontSize: 12,
    fontWeight: 500,
  },
  invoiceFooterSubtotalContent: {
    fontSize: 12,
    fontWeight: 400,
  },
  invoiceFooterborder: {
    display: "flex",
    flexDirection: "row",
    alignItmes: "center",
    paddingBottom: 10,
    borderBottom: 1,
    borderBottomColor: "#dddddd",
    borderBottomStyle: "solid",
    boredrBottomWidth: 2,
  },
  invoiceFooterTotal: {
    display: "flex",
    flexDirection: "row",
    alignItmes: "center",
    padding: 8,
    backgroundColor: "#e5e5e5",
  },
  invoiceFooterFinaltotal: {
    minWidth: "130px",
    fontSize: 13,
    fontWeight: 700,
  },
  invoiceFooterFinaltotalContent: {
    fontSize: 13,
    fontWeight: 400,
  },
  invoiceStatus: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    flexDirection: "row",
  },
  invoiceContentStatus: {
    fontSize: 14,
    fontWeight: 400,
  },
});

const Datamovies = ({ getOrderData }) => {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <View style={styles.invoiceHead}>
              <View>
                <Image
                  src={`${getOrderData?.restaurant_logo}`}
                  style={styles.rating}
                />
              </View>
              <View>
                <Text style={styles.invoiceName}>
                  {getOrderData?.orderId?.userId?.first_name}{" "}
                  {getOrderData?.orderId?.userId?.last_name}
                </Text>
                <Text style={styles.invoiceEmail}>
                  {getOrderData?.orderId?.userId?.email}
                </Text>
                <Text style={styles.invoicePhone}>
                  {getOrderData?.orderId?.contact_number}
                </Text>
              </View>
            </View>
            <View style={styles.invoiceContent}>
              <View>
                <Text style={styles.invoiceContentName}>Bill To</Text>
                <Text style={styles.invoiceContentAddress}>
                  {getOrderData?.orderId?.delivery_address?.address},{" "}
                  {getOrderData?.orderId?.delivery_address?.city?.label}{" "}
                  {getOrderData?.orderId?.delivery_address?.country} -{" "}
                  {getOrderData?.orderId?.delivery_address?.pincode}
                </Text>
              </View>
              <View style={styles.invoicePart}>
                <View>
                  <Text style={styles.invoiceNumber}>Invoice No.</Text>
                  <Text style={styles.invoiceContentNumber}>
                    #{getOrderData?.orderId?.order_number}
                  </Text>
                </View>
                <View>
                  <Text style={styles.invoiceDate}>Issue Date</Text>
                  <Text style={styles.invoiceContentDate}>
                    {moment(getOrderData?.createdAt).format("DD/MM/YYYY")}
                  </Text>
                </View>
              </View>
              <View style={styles.invoicePart}>
                <View>
                  <Text style={styles.invoiceTotal}>Invoice Total</Text>
                  <Text style={styles.invoiceContentTotal}>
                    {/* {getOrderData?.currency_symbol} */}$
                    {" "}
                    {getOrderData?.total_amount}
                  </Text>
                </View>
                <View>
                  <Text style={styles.invoicePayment}>Payment Method</Text>
                  <Text style={styles.invoiceContentPayment}>
                    Bank Transfer
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.invoiceTable}>
              <View style={styles.invoicethead}>
                <Text style={styles.invoiceThead1}>No</Text>
                <Text style={styles.invoiceThead2}>Product name</Text>
                <Text style={styles.invoiceThead3}>Price</Text>
              </View>
              {getOrderData?.orderId?.products?.map((element, index) => {
                return (
                  <>
                    <View style={styles.invoicetbody}>
                      <View style={styles.invoiceTbody1}>
                        <Text>{index + 1}</Text>
                      </View>
                      <View style={styles.invoiceDeatil}>
                        <View>
                          <Image
                            style={styles.rating}
                            src={element?.productId?.productImage[0]}
                          />
                        </View>
                        <View style={styles.invoiceTbody2}>
                          <Text style={styles.invoiceTtext}>
                            {" "}
                            {element?.productId?.product_name}
                          </Text>
                          {element?.addons?.map((element, mrpindex) => {
                            return (
                              <>
                                <Text style={styles.invoiceTsubtext}>
                                  {element?.addonsDescription}
                                </Text>
                              </>
                            );
                          })}
                        </View>
                      </View>
                      <View style={styles.invoiceTbody3}>
                        <Text style={styles.invoiceTtext}>
                          {" "}
                          {/* {getOrderData?.currency_symbol} */}
                          ${" "} {element?.productId?.price} * {element?.quantity}
                        </Text>
                        <Text style={styles.invoiceTtext}>
                          {element?.addons?.map((element, mrpindex) => {
                            return (
                              <>
                                <Text style={styles.invoiceTsubtext}>
                                  {/* {getOrderData?.currency_symbol} */} ${element?.ProductPrice}
                                </Text>
                              </>
                            );
                          })}
                        </Text>
                      </View>
                    </View>
                  </>
                );
              })}
            </View>
            <View style={styles.invoiceFooter}>
              <View style={styles.invoiceFooterContent}>
                <View style={styles.invoiceFooterHead}>
                  <Text style={styles.invoiceFooterSubtotal}>SubTotal</Text>
                  <Text style={styles.invoiceFooterSubtotalContent}>
                    {/* {getOrderData?.currency_symbol} */}$
                    {getOrderData?.orderId?.net_amount}
                  </Text>
                </View>
                <View style={styles.invoiceFooterHead}>
                  <Text style={styles.invoiceFooterSubtotal}>Discount</Text>
                  <Text style={styles.invoiceFooterSubtotalContent}>
                    {getOrderData?.discount}
                    {getOrderData?.discount_type}
                  </Text>
                </View>
                <View style={styles.invoiceFooterHead}>
                  <Text style={styles.invoiceFooterSubtotal}>
                    Tax ({getOrderData?.tax_status})
                  </Text>
                  <Text style={styles.invoiceFooterSubtotalContent}>
                    {getOrderData?.tax_rate}%
                  </Text>
                </View>
                <View
                  style={(styles.invoiceFooterHead, styles.invoiceFooterborder)}
                >
                  <Text style={styles.invoiceFooterSubtotal}>
                    Delivery charge
                  </Text>
                  <Text style={styles.invoiceFooterSubtotalContent}>
                    {/* {getOrderData?.currency_symbol} */} $
                    {getOrderData?.delivery_charge}
                  </Text>
                </View>
                <View style={styles.invoiceFooterTotal}>
                  <Text style={styles.invoiceFooterFinaltotal}>Total</Text>
                  <Text style={styles.invoiceFooterFinaltotalContent}>
                    {/* {getOrderData?.currency_symbol} */}$
                    {getOrderData?.total_amount}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default Datamovies;
