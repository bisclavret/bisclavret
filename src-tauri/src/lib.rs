use rusqlite::Connection;
use std::fs;
use tauri::{AppHandle, Manager};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            get_setting,
            set_setting,
            delete_setting,
            create_unsaved_story,
            get_unsaved_stories,
            update_unsaved_story,
            delete_unsaved_story
        ])
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            initialize_database(app.handle())?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn initialize_database(app_handle: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let app_dir = app_handle
        .path()
        .app_data_dir()
        .expect("Failed to get app data dir");
    fs::create_dir_all(&app_dir)?;

    // Create subdirectories for organization
    let db_dir = app_dir.join("db");
    let plugins_dir = app_dir.join("plugins");
    let logs_dir = app_dir.join("logs");
    fs::create_dir_all(&db_dir)?;
    fs::create_dir_all(&plugins_dir)?;
    fs::create_dir_all(&logs_dir)?;

    let db_path = db_dir.join("bisclavret.db");

    let conn = Connection::open(db_path)?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS unsaved_stories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            last_modified DATETIME DEFAULT CURRENT_TIMESTAMP
        )",
        [],
    )?;

    Ok(())
}

fn get_db_connection(app_handle: &AppHandle) -> Result<Connection, rusqlite::Error> {
    let app_dir = app_handle
        .path()
        .app_data_dir()
        .expect("Failed to get app data dir");
    let db_path = app_dir.join("db").join("bisclavret.db");
    Connection::open(db_path)
}

#[tauri::command]
fn get_setting(app_handle: AppHandle, key: String) -> Result<Option<String>, String> {
    let conn = get_db_connection(&app_handle).map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare("SELECT value FROM settings WHERE key = ?").map_err(|e| e.to_string())?;
    let mut rows = stmt.query_map([key], |row| row.get(0)).map_err(|e| e.to_string())?;
    match rows.next() {
        Some(row) => Ok(Some(row.map_err(|e| e.to_string())?)),
        None => Ok(None),
    }
}

#[tauri::command]
fn set_setting(app_handle: AppHandle, key: String, value: String) -> Result<(), String> {
    let conn = get_db_connection(&app_handle).map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",
        [key, value],
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn delete_setting(app_handle: AppHandle, key: String) -> Result<(), String> {
    let conn = get_db_connection(&app_handle).map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM settings WHERE key = ?", [key]).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn create_unsaved_story(app_handle: AppHandle, title: String, content: String) -> Result<i64, String> {
    let conn = get_db_connection(&app_handle).map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO unsaved_stories (title, content) VALUES (?, ?)",
        [title, content],
    ).map_err(|e| e.to_string())?;
    Ok(conn.last_insert_rowid())
}

#[tauri::command]
fn get_unsaved_stories(app_handle: AppHandle) -> Result<Vec<(i64, String, String, String)>, String> {
    let conn = get_db_connection(&app_handle).map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare("SELECT id, title, content, last_modified FROM unsaved_stories").map_err(|e| e.to_string())?;
    let rows = stmt.query_map([], |row| {
        Ok((
            row.get(0)?,
            row.get(1)?,
            row.get(2)?,
            row.get(3)?,
        ))
    }).map_err(|e| e.to_string())?;
    let mut stories = Vec::new();
    for row in rows {
        stories.push(row.map_err(|e| e.to_string())?);
    }
    Ok(stories)
}

#[tauri::command]
fn update_unsaved_story(app_handle: AppHandle, id: i64, title: String, content: String) -> Result<(), String> {
    let conn = get_db_connection(&app_handle).map_err(|e| e.to_string())?;
    conn.execute(
        "UPDATE unsaved_stories SET title = ?, content = ?, last_modified = CURRENT_TIMESTAMP WHERE id = ?",
        [title, content, id.to_string()],
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn delete_unsaved_story(app_handle: AppHandle, id: i64) -> Result<(), String> {
    let conn = get_db_connection(&app_handle).map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM unsaved_stories WHERE id = ?", [id]).map_err(|e| e.to_string())?;
    Ok(())
}
