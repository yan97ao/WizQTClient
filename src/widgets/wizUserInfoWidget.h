#ifndef WIZUSERINFOWIDGET_H
#define WIZUSERINFOWIDGET_H

#include <QToolButton>
#include <QPointer>

class QMenu;
class QFileDialog;

class CWizDatabase;
class CWizExplorerApp;
class CWizUserAvatarDownloaderHost;
class CWizWebSettingsDialog;


class CWizUserInfoWidget : public QToolButton
{
    Q_OBJECT

public:
    explicit CWizUserInfoWidget(CWizExplorerApp& app, QWidget *parent = 0);

protected:
    CWizExplorerApp& m_app;
    CWizDatabase& m_db;

    virtual void paintEvent(QPaintEvent *event);
    virtual QSize sizeHint() const;

private:
    CWizUserAvatarDownloaderHost* m_avatarDownloader;
    QIcon m_iconVipIndicator;
    QIcon m_iconArraw;
    QMenu* m_menuMain;

    //QPointer<QFileDialog> m_dialog;
    //QPointer<CWizAvatarUploader> m_uploader;

    CWizWebSettingsDialog* m_userSettings;

    void resetAvatar();
    void resetUserInfo();

private Q_SLOTS:
    void downloadAvatar();
    void on_userAvatar_downloaded(const QString& strGUID);
    void on_action_accountInfo_triggered();
    void on_action_accountSetup_triggered();

    void on_action_changeAvatar_triggered();
    void on_action_changeAvatar_uploaded(bool ok);
};

#endif // WIZUSERINFOWIDGET_H