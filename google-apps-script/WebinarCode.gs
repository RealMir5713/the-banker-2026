/**
 * Google Apps Script — The Banker 2026 Webinar Registration Handler
 *
 * DEPLOYMENT INSTRUCTIONS
 * ───────────────────────
 * 1. Open https://script.google.com and create a NEW project (separate from the competition one).
 * 2. Paste all of this code into Code.gs
 * 3. Update the constants below:
 *      SHEET_ID        → the Google Spreadsheet ID for the WEBINAR sheet (from the URL)
 *      SHEET_NAME      → the tab/sheet name (e.g. "Webinar")
 *      DRIVE_FOLDER_ID → a Google Drive folder ID to store webinar proof images
 * 4. Click "Deploy" → "New deployment" → Type: Web App
 *      Execute as: Me (your Google account)
 *      Who has access: Anyone
 * 5. Copy the Web App URL and add it as the Vercel env variable:
 *      WEBINAR_GOOGLE_APPS_SCRIPT_URL=<your new web app URL>
 * 6. Redeploy on Vercel.
 */

// ─── CONFIG ────────────────────────────────────────────────────────────────
var SHEET_ID        = "YOUR_WEBINAR_SPREADSHEET_ID_HERE";
var SHEET_NAME      = "Webinar";
var DRIVE_FOLDER_ID = "YOUR_WEBINAR_DRIVE_FOLDER_ID_HERE";
// ────────────────────────────────────────────────────────────────────────────

var HEADERS = [
  "Thời gian",
  "Họ và tên",
  "Số điện thoại",
  "Email",
  "Link Facebook",
  "Trường đại học",
  "Năm học",
  "MSSV",
  "Lớp - Khóa - Chuyên ngành",
  "Minh chứng Like & Share bài post (Drive links)",
  "Minh chứng Follow Fanpage (Drive links)",
  "Câu hỏi cho diễn giả",
  "Lời nhắn cho BTC"
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

    var postLinks    = "";
    var fanpageLinks = "";

    if (DRIVE_FOLDER_ID && DRIVE_FOLDER_ID !== "YOUR_WEBINAR_DRIVE_FOLDER_ID_HERE") {
      var folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);

      // Save proof post images
      if (payload.proof_post_images && payload.proof_post_images.length > 0) {
        var postUrls = [];
        for (var i = 0; i < payload.proof_post_images.length; i++) {
          var url = saveFile_(folder, payload.proof_post_images[i], payload.full_name + "_Post_" + (i + 1));
          postUrls.push(url);
        }
        postLinks = postUrls.join("\n");
      }

      // Save proof fanpage images
      if (payload.proof_fanpage_images && payload.proof_fanpage_images.length > 0) {
        var fanpageUrls = [];
        for (var j = 0; j < payload.proof_fanpage_images.length; j++) {
          var fUrl = saveFile_(folder, payload.proof_fanpage_images[j], payload.full_name + "_Fanpage_" + (j + 1));
          fanpageUrls.push(fUrl);
        }
        fanpageLinks = fanpageUrls.join("\n");
      }
    }

    var row = [
      now,
      payload.full_name          || "",
      payload.phone              || "",
      payload.email              || "",
      payload.facebook_url       || "",
      payload.university         || "",
      payload.year               || "",
      payload.student_id         || "",
      payload.class_info         || "",
      postLinks,
      fanpageLinks,
      payload.speaker_question   || "",
      payload.organizer_message  || ""
    ];

    sheet.appendRow(row);

    return buildJsonResponse_({ status: "ok", message: "Đăng ký webinar thành công." });
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
      sheet.setFrozenRows(1);
    }
  } catch (e) {
    Logger.log("ensureHeaders_ error: " + e);
  }
}

function buildJsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
