/**
 * Google Apps Script — The Banker 2026 Registration Handler
 *
 * DEPLOYMENT INSTRUCTIONS
 * ───────────────────────
 * 1. Open https://script.google.com and create a new project.
 * 2. Paste all of this code into Code.gs (replace the default content).
 * 3. Update the constants below:
 *      SHEET_ID  → the Google Spreadsheet ID (from the URL)
 *      SHEET_NAME → the tab/sheet name to write rows into
 *      DRIVE_FOLDER_ID → the Google Drive folder ID to store uploaded files
 * 4. Click "Deploy" → "New deployment" → Type: Web App
 *      Execute as: Me (your Google account)
 *      Who has access: Anyone
 * 5. Copy the Web App URL and set it as GOOGLE_APPS_SCRIPT_URL
 *    in your .env.local file (and on Vercel / hosting environment).
 * 6. Every time you edit this script, create a new deployment version.
 */

// ─── CONFIG ────────────────────────────────────────────────────────────────
const SHEET_ID        = "1K6SAUiRUFYJuNcb-9SFp7HRdR16-tdZpjFEzbVDmNrY";
const SHEET_NAME      = "Sheet1";
const DRIVE_FOLDER_ID = "YOUR_DRIVE_FOLDER_ID_HERE"; // Replace with actual folder ID
// ────────────────────────────────────────────────────────────────────────────

const HEADERS = [
  "Thời gian",
  "Họ và tên",
  "Số điện thoại",
  "Email",
  "Trường đại học",
  "Năm học",
  "Khóa – Lớp",
  "Mã sinh viên",
  "Minh chứng Like Fanpage",
  "Minh chứng Share bài mở đơn",
  "Câu hỏi cho BTC"
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

    // Process file uploads if present
    var fanpageProofUrl = "";
    var shareProofUrl = "";

    if (DRIVE_FOLDER_ID && DRIVE_FOLDER_ID !== "YOUR_DRIVE_FOLDER_ID_HERE") {
      var folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
      
      if (payload.fanpage_like_proof_file && payload.fanpage_like_proof_file.base64) {
        fanpageProofUrl = saveFile_(folder, payload.fanpage_like_proof_file, payload.full_name + "_FanpageLike");
      }
      
      if (payload.share_proof_file && payload.share_proof_file.base64) {
        shareProofUrl = saveFile_(folder, payload.share_proof_file, payload.full_name + "_ShareProof");
      }
    }

    var row = [
      now,
      payload.full_name                  || "",
      payload.phone                      || "",
      payload.email                      || "",
      payload.university                 || "",
      payload.year                       || "",
      payload.class_info                 || "",
      payload.student_id                 || "",
      fanpageProofUrl,
      shareProofUrl,
      payload.questions                  || ""
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
        .setBackground("#0B1F3A")
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
