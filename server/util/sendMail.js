const nodemailer = require('nodemailer');
const SMTP_CONFIG = require("./smtp");
class sendMail {

    constructor() {

    }
    async sendMailToCompany(donationName, companyName, companyEmail) {
        let transporter = nodemailer.createTransport({
            service: "hotmail",
            host: SMTP_CONFIG.host,
            port: SMTP_CONFIG.port,
            secure: false,
            auth: {
                user: SMTP_CONFIG.user,
                pass: SMTP_CONFIG.pass
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });
        try {
            let info = await transporter.sendMail({
                from: '"HelpFood" <apphelpfood@hotmail.com>', // sender address
                to: companyEmail, // list of receivers
                subject: "Sua doação foi solicitada!", // Subject line
                html: `<html>
            <head>
              <meta charset="utf-8">
              <title></title>
            </head>
            <body>
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="margin:0px auto;background:#fff;background-color:#fff;width:600px!important;max-width:600px;text-align:center"
                width="600">
                <tbody>
                  <tr>
                    <td
                      style="direction:ltr;font-size:0px;padding:0px 0;padding-bottom:0;padding-top:0px;padding-left:0px;padding-right:0px;text-align:center">
                      <div style="line-height:22px;margin:0px auto;max-width:600px">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                          <tbody>
                            <tr>
                              <td style="direction:ltr;font-size:0px;padding:20px 0 20px 0;text-align:center">
                                <div class="m_9004413157721473316mj-column-per-100"
                                  style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                    <tbody>
                                      <tr>
                                        <td style="vertical-align:top;padding:0;text-align:center" valign="top" align="center">
                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                            <tbody>
                                              <tr>
                                                <td align="center"
                                                  style="font-size:0px;padding:0;word-break:break-word;text-align:center">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                    style="border-collapse:collapse;border-spacing:0px">
                                                    <tbody>
                                                      <tr>
                                                        <td style="width:600px;text-align:center" width="600" align="center"><a
                                                            href="#"
                                                            style="display:inline-block;text-decoration:none;text-transform:none;vertical-align:middle"
                                                            target="_blank">
                                                            <img alt="HelpFood" height="auto"
                                                              src="../util/logo.png"
                                                              style="max-width:160px;width:160px;border:0;display:block;outline:none;text-decoration:none;height:auto;font-size:13px"
                                                              width="160" class="CToWUd"> </a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <div>
                          <div style="line-height:0;background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                              style="line-height:0;background:#ffffff;background-color:#ffffff;width:100%" width="100%"
                              bgcolor="#FFFFFF">
                              <tbody>
                                <tr>
                                  <td style="direction:ltr;font-size:0px;padding:0;text-align:center">
                                    <div style="padding:0;padding:0 16px;margin:0px auto;max-width:600px">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                        style="width:100%">
                                        <tbody>
                                          <tr>
                                            <td style="direction:ltr;font-size:0px;text-align:center;padding:0" align="center">
                                              <div class="m_9004413157721473316mj-column-per-100"
                                                style="font-size:0;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr">
                                                <div class="m_9004413157721473316mj-column-per-100"
                                                  style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                    style="vertical-align:top" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td align="left"
                                                          style="direction:ltr;font-size:0px;word-break:break-word;padding:0">
                                                          <table cellpadding="0" cellspacing="0" width="100%" border="0"
                                                            style="color:#000000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;border:none">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding:0">
                                                                  <div
                                                                    style="padding-top:12px;font-size:32px;line-height:41.6px;font-family:'Open Sans',OpenSans,Helvetica,Arial;font-weight:900;color:#333333">
                                                                    <span>Doação solicitada</span>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td style="padding:0">
                                                                  <div
                                                                    style="margin-top:27px;font-size:24px;line-height:32px;font-family:'Open Sans',OpenSans,Helvetica,Arial;color:#000000">
                                                                    <span><span>Olá ${companyName},</span></span>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td style="padding:0">
                                                                  <div
                                                                    style="margin-top:32px;line-height:36px;font-size:24px;font-family:'Open Sans',OpenSans,Helvetica,Arial;font-weight:500;color:#000000">
                                                                    <span>Informamos que a sua doação <a
                                                                        href="#"
                                                                        style="text-decoration:none;color:#2277ff;font-weight:800"
                                                                        target="_blank"
                                                                        data-saferedirecturl="#">${donationName}</a>
                                                                      foi solicitada. Você pode ver quem irá retirar clicando no botão abaixo.</span>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td style="padding:0">
                                                                  <div style="display:inline-block">
                                                                    <a href="#"
                                                                      style="color:#000000;text-decoration:none" target="_blank">
                                                                      <div
                                                                        style="padding:15px 64px;margin-top:25px;line-height:30px;text-align:center;background-color:#000000">
                                                                        <span
                                                                          style="font-weight:bold;font-size:24px;color:#ffffff">Ver
                                                                          detalhes da solicitação</span>
                                                                      </div>
                                                                    </a>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td style="padding:0">
                                                                  <div
                                                                    style="margin-top:25px;font-size:24px;font-family:'Open Sans',OpenSans,Helvetica,Arial;font-weight:500;line-height:36px;color:#222222">
                                                                    <span>Fique atento, pois a qualquer momento alguém poderá entrar em contato para combinar a retirada!</span>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </body>
            </html>`
            });
            console.log("Company Message sent: %s", info.messageId);

            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        catch (e) {
            console.log(e)
        }
    }
    async sendMailToUser(userName, donationName, companyName, companyEmail, userEmail, donationAddress, phone) {
        let transporter = nodemailer.createTransport({
            service: "hotmail",
            host: SMTP_CONFIG.host,
            port: SMTP_CONFIG.port,
            secure: false,
            auth: {
                user: SMTP_CONFIG.user2,
                pass: SMTP_CONFIG.pass
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });
        try {
            let info = await transporter.sendMail({
                from: '"HelpFood" <helpfoodapp@hotmail.com>', // sender address
                to: userEmail, // list of receivers
                subject: "Recebemos o seu pedido!", // Subject line
                html: `<html>
            <head>
              <meta charset="utf-8">
              <title></title>
            </head>
            <body>
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="margin:0px auto;background:#fff;background-color:#fff;width:600px!important;max-width:600px;text-align:center"
                width="600">
                <tbody>
                  <tr>
                    <td
                      style="direction:ltr;font-size:0px;padding:0px 0;padding-bottom:0;padding-top:0px;padding-left:0px;padding-right:0px;text-align:center">
                      <div style="line-height:22px;margin:0px auto;max-width:600px">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                          <tbody>
                            <tr>
                              <td style="direction:ltr;font-size:0px;padding:20px 0 20px 0;text-align:center">
                                <div class="m_9004413157721473316mj-column-per-100"
                                  style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                    <tbody>
                                      <tr>
                                        <td style="vertical-align:top;padding:0;text-align:center" valign="top" align="center">
                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                            <tbody>
                                              <tr>
                                                <td align="center"
                                                  style="font-size:0px;padding:0;word-break:break-word;text-align:center">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                    style="border-collapse:collapse;border-spacing:0px">
                                                    <tbody>
                                                      <tr>
                                                        <td style="width:600px;text-align:center" width="600" align="center"><a
                                                            href="#"
                                                            style="display:inline-block;text-decoration:none;text-transform:none;vertical-align:middle"
                                                            target="_blank">
                                                            <img alt="HelpFood" height="auto"
                                                              src="../util/logo.png"
                                                              style="max-width:160px;width:160px;border:0;display:block;outline:none;text-decoration:none;height:auto;font-size:13px"
                                                              width="160" class="CToWUd"> </a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <div>
                          <div style="line-height:0;background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                              style="line-height:0;background:#ffffff;background-color:#ffffff;width:100%" width="100%"
                              bgcolor="#FFFFFF">
                              <tbody>
                                <tr>
                                  <td style="direction:ltr;font-size:0px;padding:0;text-align:center">
                                    <div style="padding:0;padding:0 16px;margin:0px auto;max-width:600px">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                        style="width:100%">
                                        <tbody>
                                          <tr>
                                            <td style="direction:ltr;font-size:0px;text-align:center;padding:0" align="center">
                                              <div class="m_9004413157721473316mj-column-per-100"
                                                style="font-size:0;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr">
                                                <div class="m_9004413157721473316mj-column-per-100"
                                                  style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                    style="vertical-align:top" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td align="left"
                                                          style="direction:ltr;font-size:0px;word-break:break-word;padding:0">
                                                          <table cellpadding="0" cellspacing="0" width="100%" border="0"
                                                            style="color:#000000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;border:none">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding:0">
                                                                  <div
                                                                    style="padding-top:12px;font-size:32px;line-height:41.6px;font-family:'Open Sans',OpenSans,Helvetica,Arial;font-weight:900;color:#333333">
                                                                    <span>Doação solicitada</span>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td style="padding:0">
                                                                  <div
                                                                    style="margin-top:27px;font-size:24px;line-height:32px;font-family:'Open Sans',OpenSans,Helvetica,Arial;color:#000000">
                                                                    <span><span>Olá ${userName},</span></span>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td style="padding:0">
                                                                  <div
                                                                    style="margin-top:32px;line-height:36px;font-size:24px;font-family:'Open Sans',OpenSans,Helvetica,Arial;font-weight:500;color:#000000">
                                                                    <span>Informamos que recebemos a sua solicitação da doação <a
                                                                        href="#"
                                                                        style="text-decoration:none;color:#2277ff;font-weight:800"
                                                                        target="_blank"
                                                                        data-saferedirecturl="#">${donationName}</a>
                                                                      foi solicitada. Você pode conferir os dados de retirada abaixo.</span>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td style="padding:0">
                                                                    <div style="margin-top:25px;line-height:36px;font-size:24px;font-style:bold;font-family:'Open Sans',OpenSans,Helvetica,Arial;font-weight:500;color:#000000">
                                                                        <span>
                                                                            ${companyName}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td style="padding:0">
                                                                    <div style="line-height:36px;font-size:18px;font-family:'Open Sans',OpenSans,Helvetica,Arial;font-weight:500;color:#000000">
                                                                        <span>
                                                                            Endereço: ${donationAddress}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td style="padding:0">
                                                                    <div style="line-height:36px;font-size:18px;font-family:'Open Sans',OpenSans,Helvetica,Arial;font-weight:500;color:#000000">
                                                                        <span>
                                                                            E-mail: ${companyEmail}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                              <td style="padding:0">
                                                                  <div style="line-height:36px;font-size:18px;font-family:'Open Sans',OpenSans,Helvetica,Arial;font-weight:500;color:#000000">
                                                                    <span>
                                                                        Telefone: ${phone}
                                                                    </span>
                                                                  </div>
                                                              </td>
                                                            </tr>
                                                              <tr>
                                                                <td style="padding:0">
                                                                  <div
                                                                    style="margin-top:25px;font-size:24px;font-family:'Open Sans',OpenSans,Helvetica,Arial;font-weight:500;line-height:36px;color:#222222">
                                                                    <span>Recomendamos que você entre em contato pelo número informado acima antes de ir até o local!</span>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </body>
            </html>`
            });
            console.log("Message sent: %s", info.messageId);

            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        catch (e) {
            console.log(e)
        }

    }
}
module.exports = sendMail;