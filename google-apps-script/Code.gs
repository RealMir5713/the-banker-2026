/**
 * Google Apps Script — The Banker 2026 Registration Handler
 *
 * DEPLOYMENT INSTRUCTIONS
 * ───────────────────────
 * 1. Open https://script.google.com and create a new project.
 * 2. Paste all of this code into Code.gs
 * 3. Update the constants below:
 *      SHEET_ID  → the Google Spreadsheet ID (from the URL)
 *      SHEET_NAME → the tab/sheet name to write rows into
 *      DRIVE_FOLDER_ID → the Google Drive folder ID to store uploaded CVs and proofs
 * 4. Click "Deploy" → "New deployment" → Type: Web App
 *      Execute as: Me (your Google account)
 *      Who has access: Anyone
 * 5. Copy the Web App URL and set it as GOOGLE_APPS_SCRIPT_URL
 */

// ─── CONFIG ────────────────────────────────────────────────────────────────
const SHEET_ID        = "1K6SAUiRUFYJuNcb-9SFp7HRdR16-tdZpjFEzbVDmNrY";
const SHEET_NAME      = "Sheet1";
const DRIVE_FOLDER_ID = "1rwHJKZOJnrVhfFqdXeNdSiIITyivc5IJ";
// ────────────────────────────────────────────────────────────────────────────

const HEADERS = [
  "Thời gian",
  "Hình thức",
  "Tên nhóm",
  "Họ và tên / Trưởng nhóm",
  "Số điện thoại",
  "Email",
  "Ngày sinh",
  "Link Facebook",
  "CV",
  "Trường (Cá nhân/NT)",
  "Chuyên ngành (Cá nhân/NT)",
  "Năm học (Cá nhân/NT)",
  "Thành viên A",
  "Trường A",
  "Chuyên ngành A",
  "Năm học A",
  "Thành viên B",
  "Trường B",
  "Chuyên ngành B",
  "Năm học B",
  "Thành viên C",
  "Trường C",
  "Chuyên ngành C",
  "Năm học C",
  "Link minh chứng",
  "File minh chứng",
  "Nguồn biết đến",
  "Mục tiêu",
  "Đã từng thi chưa"
];

function doGet() {
  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    ensureHeaders_();

    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    var now   = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss");

    var cvUrl = "";
    var proofFileUrl = "";

    if (DRIVE_FOLDER_ID && DRIVE_FOLDER_ID !== "YOUR_DRIVE_FOLDER_ID_HERE") {
      var folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
      
      if (payload.cv_file && payload.cv_file.base64) {
        cvUrl = saveFile_(folder, payload.cv_file, payload.full_name + "_CV");
      }
      
      if (payload.proof_images && payload.proof_images.length > 0) {
        var urls = [];
        for (var i = 0; i < payload.proof_images.length; i++) {
          var imgUrl = saveFile_(folder, payload.proof_images[i], payload.full_name + "_Proof_" + (i + 1));
          urls.push(imgUrl);
        }
        proofFileUrl = urls.join("\n");
      }
    }

    var row = [
      now,
      payload.registration_type          || "",
      payload.team_name                  || "",
      payload.full_name                  || "",
      payload.phone                      || "",
      payload.email                      || "",
      payload.birth_date                 || "",
      payload.facebook_url               || "",
      cvUrl,
      payload.university                 || "",
      payload.major                      || "",
      payload.year                       || "",
      payload.member_a_name              || "",
      payload.member_a_university        || "",
      payload.member_a_major             || "",
      payload.member_a_year              || "",
      payload.member_b_name              || "",
      payload.member_b_university        || "",
      payload.member_b_major             || "",
      payload.member_b_year              || "",
      payload.member_c_name              || "",
      payload.member_c_university        || "",
      payload.member_c_major             || "",
      payload.member_c_year              || "",
      "",                                // Link minh chứng (đã bỏ)
      proofFileUrl,
      payload.source                     || "",
      payload.goals                      || "",
      payload.has_participated           || ""
    ];

    sheet.appendRow(row);

    return buildJsonResponse_({ status: "ok", message: "Đăng ký thành công." });
  } catch (err) {
    return buildJsonResponse_({ status: "error", message: err.toString() });
  }
}

function saveFile_(folder, fileData, namePrefix) {
  try {
    var data = Utilities.base64Decode(fileData.base64);
    var blob = Utilities.newBlob(data, fileData.mimeType, namePrefix + "_" + fileData.filename);
    var file = folder.createFile(blob);
    return file.getUrl();
  } catch (e) {
    Logger.log("saveFile_ error: " + e);
    return "Error saving file: " + e.message;
  }
}

function ensureHeaders_() {
  try {
    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight("bold")
        .setBackground("#f97316")
        .setFontColor("#FFFFFF");
    }
  } catch (e) {
    Logger.log("ensureHeaders_ error: " + e);
  }
}

function buildJsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
